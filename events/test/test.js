/**
 * SBCE traced tests: one describe per requirement group (Rn), one it per
 * statement — the `Rn.m` id leads the test title (the grep-visible trace
 * token binding spec and test, see each BC's package-info.md).
 */
// store first: it completes the reducer/control module cycle in the same
// order the application does (AirElement imports it before any control)
import store from "../src/store.js";
import { events } from "../src/creation/entity/EventsReducer.js";
import { createEventAction, inputChangedAction, inputChanged, createEvent } from "../src/creation/control/EventsControl.js";
import { linkValidatedAction, validate } from "../src/creation/control/LinkValidatorControl.js";
import { overview } from "../src/overview/entity/OverviewReducer.js";
import matchesCriteria from "../src/overview/entity/Filter.js";
import { eventSelectedAction, editSelectedAction, deleteSelectedAction, deselectAllAction, eventSelected, previewSelected, deselectAll } from "../src/overview/control/EventsControl.js";
import { filter } from "../src/filter/entity/FilterReducer.js";
import { onFilterChangedAction, onFilterChanged } from "../src/filter/control/FilterControl.js";
import { status } from "../src/status/entity/StatusReducer.js";
import { requestStartedAction, requestCompletedAction, errorHappenedAction, clearMessageAction, requestStarted, requestCompleted, errorHappened, clearMessage } from "../src/status/control/StatusControl.js";
import { save, load } from "../src/localstorage/control/StorageControl.js";
import { appName } from "../src/app.config.js";

import "../src/creation/boundary/NewEvent.js";
import "../src/overview/boundary/Overview.js";
import "../src/preview/boundary/Preview.js";
import "../src/status/boundary/Status.js";
import "../src/inputs/boundary/DateInput.js";

mocha.setup({ ui: 'bdd', timeout: 10000 });
const assert = chai.assert;

// AirElement traces every render — silence the noise, keep errors visible
console.log = console.group = console.groupEnd = () => {};

const INIT = { type: '@@INIT/test' };
const STORAGE_KEY = `${appName}.localstorage.control`;

/** @returns {EventEntity} a complete, valid event */
const fullEvent = (eventname, startdate = '2026-09-01', enddate = '2026-09-02') => ({
    eventname, startdate, enddate,
    locationname: 'airport muc', online: false, address: 'terminal 2',
    link: 'http://airhacks.com', description: `${eventname} workshop`
});

/** loads an event into the form cache through the change-input boundary op */
const fillForm = event => Object.entries(event).forEach(([name, value]) => inputChanged(name, value));

const listNames = () => store.getState().events.list.map(e => e.eventname);

const mount = tag => {
    const element = document.createElement(tag);
    document.body.appendChild(element);
    return element;
};

const until = async (predicate, timeout = 5000) => {
    const start = Date.now();
    while (!predicate()) {
        if (Date.now() - start > timeout) throw new Error('condition not met in time');
        await new Promise(resolve => setTimeout(resolve, 50));
    }
};

/** true when the optional Quarkus validator answers — R3.2/S2 need it DOWN */
const validatorReachable = async () => {
    try {
        await fetch('http://localhost:8080/validations', { method: 'POST', body: 'http://probe' });
        return true;
    } catch {
        return false;
    }
};

// ---------------------------------------------------------------- creation

describe('creation · R1: capture form input', () => {
    const newEventForm = () => document.createElement('a-creation-new-event');
    const cases = [
        { req: 'R1.1', title: 'field change lands in the form cache, list untouched', run: () => {
            const listBefore = store.getState().events.list;
            inputChanged('description', 'sbce probe');
            const { events: { form, list } } = store.getState();
            assert.equal(form.description, 'sbce probe');
            assert.deepEqual(list, listBefore);
        } },
        { req: 'R1.2', title: 'start date change defaults the end date', run: () => {
            newEventForm().onStartDate({ target: { name: 'startdate', value: '2026-10-05' } });
            const { events: { form } } = store.getState();
            assert.equal(form.startdate, '2026-10-05');
            assert.equal(form.enddate, '2026-10-05');
        } },
        { req: 'R1.3', title: 'online flag pre-fills and clears the location name', run: () => {
            const form = newEventForm();
            form.onOnline({ target: { name: 'online', checked: true } });
            assert.equal(store.getState().events.form.locationname, 'online');
            assert.isTrue(store.getState().events.form.online);
            form.onOnline({ target: { name: 'online', checked: false } });
            assert.equal(store.getState().events.form.locationname, '');
        } },
        { req: 'R1.4', title: 'link change triggers the asynchronous validation', run: async () => {
            newEventForm().onUserInput({ target: { name: 'link', value: 'http://airhacks.com' } });
            const { status: { loading } } = store.getState();
            assert.equal(loading.message, 'uri validation');
            await until(() => store.getState().status.loading.status === false);
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

describe('creation · R2: save an event', () => {
    const cases = [
        { req: 'R2.1', title: 'complete form is added to the list', run: () => {
            const state = { ...events(undefined, INIT), form: fullEvent('r2.1-event') };
            const next = events(state, createEventAction());
            assert.include(next.list.map(e => e.eventname), 'r2.1-event');
        } },
        { req: 'R2.2', title: 'missing field rejects the save via native validation', run: () => {
            const element = mount('a-creation-new-event');
            try {
                store.dispatch(linkValidatedAction({ ok: true, status: 200 }));
                fillForm({ ...fullEvent('r2.2-event'), description: '' });
                element.querySelector('button[type=submit]').click();
                assert.notInclude(listNames(), 'r2.2-event');
            } finally {
                element.remove();
            }
        } },
        { req: 'R2.3', title: 'existing name is replaced, never duplicated', run: () => {
            const original = fullEvent('r2.3-event');
            const edited = { ...original, description: 'edited' };
            const state = { ...events(undefined, INIT), list: [original], form: edited };
            const next = events(state, createEventAction());
            assert.lengthOf(next.list, 1);
            assert.equal(next.list[0].description, 'edited');
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

describe('creation · R3: validate the link', () => {
    it('R3.1 — rejected link blocks the save', () => {
        const element = mount('a-creation-new-event');
        try {
            fillForm(fullEvent('r3.1-event'));
            store.dispatch(linkValidatedAction({ ok: false, status: 404 }));
            element.querySelector('button[type=submit]').click();
            assert.notInclude(listNames(), 'r3.1-event');
        } finally {
            store.dispatch(linkValidatedAction({ ok: true, status: 200 }));
            element.remove();
        }
    });
    it('R3.2 — unreachable validator reports the failure and allows saving', async function () {
        if (await validatorReachable()) this.skip();
        clearMessage();
        await validate('http://airhacks.com');
        const { events: { validations }, status: { message } } = store.getState();
        assert.equal(message, 'Validation server is not available');
        assert.isTrue(validations.ok);
        clearMessage();
    });
    it('R3.3 — in-flight request disables the form', () => {
        const element = mount('a-creation-new-event');
        try {
            requestStarted('r3.3 probe');
            assert.isTrue(element.querySelector('input[name=eventname]').disabled);
            requestCompleted('r3.3 probe');
            assert.isFalse(element.querySelector('input[name=eventname]').disabled);
        } finally {
            element.remove();
        }
    });
});

// ---------------------------------------------------------------- overview

describe('overview · R1: list events', () => {
    it('R1.1 — events are sorted chronologically by start date', async () => {
        // overlapping ranges: sorting by anything but the start date misorders them
        fillForm(fullEvent('sorted-late', '2026-03-01', '2026-03-02'));
        createEvent();
        fillForm(fullEvent('sorted-early', '2026-01-05', '2026-12-31'));
        createEvent();
        onFilterChanged('sorted-');
        const element = mount('a-overview');
        try {
            const names = [...element.querySelectorAll('tbody tr')].map(row => row.cells[0].textContent.trim());
            assert.deepEqual(names, ['sorted-early', 'sorted-late']);
        } finally {
            onFilterChanged('');
            element.remove();
        }
    });
    it('R1.2 — a set keyword displays only matching events', () => {
        fillForm(fullEvent('unrelated-event'));
        createEvent();
        onFilterChanged('sorted-');
        const element = mount('a-overview');
        try {
            const names = [...element.querySelectorAll('tbody tr')].map(row => row.cells[0].textContent.trim());
            assert.include(names, 'sorted-early');
            assert.notInclude(names, 'unrelated-event');
        } finally {
            onFilterChanged('');
            element.remove();
        }
    });
    const matching = [
        { req: 'R1.3', title: 'keyword matches case-insensitively across all textual fields', run: () => {
            const event = fullEvent('Web Components');
            assert.isTrue(matchesCriteria(event, 'web'));
            assert.isTrue(matchesCriteria(event, 'AIRHACKS.COM'));
            assert.isTrue(matchesCriteria(event, 'terminal'));
            assert.isFalse(matchesCriteria(event, 'quarkus'));
        } },
        { req: 'R1.4', title: 'empty keyword matches every event', run: () => {
            assert.isTrue(matchesCriteria(fullEvent('any'), ''));
            assert.isTrue(matchesCriteria({}, ''));
        } }
    ];
    for (const c of matching) it(`${c.req} — ${c.title}`, c.run);
});

describe('overview · R2: select events', () => {
    it('R2.1 — toggling a row records the selection state', () => {
        const state = { list: [{ ...fullEvent('r2.1-row'), checked: false }] };
        const next = overview(state, eventSelectedAction({ name: 'r2.1-row', checked: true }));
        assert.isTrue(next.list[0].checked);
    });
    it('R2.2 — no selection disables all bulk actions', () => {
        deselectAll();
        const element = mount('a-overview-actions');
        try {
            const buttons = [...element.querySelectorAll('button')];
            assert.lengthOf(buttons, 4);
            buttons.forEach(button => assert.isTrue(button.disabled, button.textContent));
        } finally {
            element.remove();
        }
    });
    it('R2.3 — multiple selection disables edit and preview only', () => {
        eventSelected('sorted-early', true);
        eventSelected('sorted-late', true);
        const element = mount('a-overview-actions');
        try {
            const byLabel = label => [...element.querySelectorAll('button')].find(b => b.textContent === label);
            assert.isTrue(byLabel('edit').disabled);
            assert.isTrue(byLabel('preview').disabled);
            assert.isFalse(byLabel('deselect all').disabled);
            assert.isFalse(byLabel('delete').disabled);
        } finally {
            deselectAll();
            element.remove();
        }
    });
});

describe('overview · R3: edit the selected event', () => {
    it('R3.1 — the single selected event is loaded into the form cache in edit mode', () => {
        const selected = { ...fullEvent('r3.1-selected'), checked: true };
        const next = overview({ list: [selected] }, editSelectedAction());
        assert.equal(next.form.eventname, 'r3.1-selected');
        assert.isTrue(next.editMode);
    });
});

describe('overview · R4: preview the selected event', () => {
    it('R4.1 — the single selected event is loaded and the preview is navigated to', () => {
        eventSelected('sorted-early', true);
        const navigated = [];
        const originalNavigate = navigation.navigate;
        navigation.navigate = url => navigated.push(url);
        try {
            previewSelected();
            assert.deepEqual(navigated, ['/preview']);
            assert.equal(store.getState().events.form.eventname, 'sorted-early');
        } finally {
            navigation.navigate = originalNavigate;
            deselectAll();
        }
    });
});

describe('overview · R5: delete and deselect', () => {
    const cases = [
        { req: 'R5.1', title: 'delete removes every selected event', run: () => {
            const state = { list: [
                { ...fullEvent('keep'), checked: false },
                { ...fullEvent('drop'), checked: true }
            ] };
            const next = overview(state, deleteSelectedAction());
            assert.deepEqual(next.list.map(e => e.eventname), ['keep']);
        } },
        { req: 'R5.2', title: 'deselect-all clears every selection', run: () => {
            const state = { list: [
                { ...fullEvent('one'), checked: true },
                { ...fullEvent('two'), checked: true }
            ] };
            const next = overview(state, deselectAllAction());
            assert.isTrue(next.list.every(e => !e.checked));
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

// ---------------------------------------------------------------- filter

describe('filter · R1: hold the keyword', () => {
    const cases = [
        { req: 'R1.1', title: 'keyword change is recorded', run: () => {
            assert.equal(filter(undefined, onFilterChangedAction('java')).filter, 'java');
        } },
        { req: 'R1.2', title: 'starts with an empty keyword', run: () => {
            assert.equal(filter(undefined, INIT).filter, '');
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

// ---------------------------------------------------------------- inputs

describe('inputs · R1: date input', () => {
    it('R1.1 — produces ISO 8601 dates through the native date control', () => {
        const element = mount('a-inputs-date');
        element.setAttribute('name', 'startdate');
        try {
            // input type="date" yields yyyy-mm-dd values per the HTML standard
            assert.equal(element.querySelector('input').type, 'date');
        } finally {
            element.remove();
        }
    });
    it('R1.2 — displays the form cache value of its field', () => {
        const element = document.createElement('a-inputs-date');
        element.setAttribute('name', 'startdate');
        document.body.appendChild(element);
        try {
            inputChanged('startdate', '2026-11-11');
            assert.equal(element.querySelector('input').value, '2026-11-11');
        } finally {
            element.remove();
        }
    });
    it('R1.3 — a disabled host renders a disabled input', () => {
        const element = document.createElement('a-inputs-date');
        element.setAttribute('name', 'startdate');
        element.setAttribute('disabled', '');
        document.body.appendChild(element);
        try {
            assert.isTrue(element.querySelector('input').disabled);
        } finally {
            element.remove();
        }
    });
});

// ---------------------------------------------------------------- localstorage

describe('localstorage · R1: persist', () => {
    const cases = [
        { req: 'R1.1', title: 'the entire state is persisted', run: () => {
            const state = { probe: ['a', 'b'], nested: { n: 1 } };
            save(state);
            assert.deepEqual(JSON.parse(localStorage.getItem(STORAGE_KEY)), state);
        } },
        { req: 'R1.2', title: 'the storage key derives from the application name', run: () => {
            save({ keyprobe: true });
            assert.equal(appName, 'events');
            assert.isNotNull(localStorage.getItem(`${appName}.localstorage.control`));
        } },
        { req: 'R1.3', title: 'a persistence failure is logged, never thrown', run: () => {
            const circular = {};
            circular.self = circular;   // JSON.stringify throws on this
            assert.doesNotThrow(() => save(circular));
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

describe('localstorage · R2: preload', () => {
    const cases = [
        { req: 'R2.1', title: 'the persisted state is provided on startup', run: () => {
            const state = { restored: 42 };
            save(state);
            assert.deepEqual(load(), state);
        } },
        { req: 'R2.2', title: 'no persisted or unreadable state yields nothing', run: () => {
            localStorage.removeItem(STORAGE_KEY);
            assert.isNull(load());
            localStorage.setItem(STORAGE_KEY, '{not-json');
            assert.isNull(load());
            localStorage.removeItem(STORAGE_KEY);
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

// ---------------------------------------------------------------- status

describe('status · R1: track requests', () => {
    const cases = [
        { req: 'R1.1', title: 'a started request is recorded as in flight with its description', run: () => {
            const next = status(undefined, requestStartedAction('sync'));
            assert.isTrue(next.loading.status);
            assert.equal(next.loading.message, 'sync');
        } },
        { req: 'R1.2', title: 'a completed request clears the in-flight state', run: () => {
            const started = status(undefined, requestStartedAction('sync'));
            const next = status(started, requestCompletedAction('sync'));
            assert.isFalse(next.loading.status);
        } },
        { req: 'R1.3', title: 'the loading state is exposed to every component', run: () => {
            requestStarted('r1.3 probe');
            assert.isTrue(store.getState().status.loading.status);
            requestCompleted('r1.3 probe');
            assert.isFalse(store.getState().status.loading.status);
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

describe('status · R2: report errors', () => {
    const cases = [
        { req: 'R2.1', title: 'a reported error displays its message', run: () => {
            const next = status(undefined, errorHappenedAction({ error: 'boom', message: 'it broke' }));
            assert.equal(next.message, 'it broke');
        } },
        { req: 'R2.2', title: 'clearing removes message and error', run: () => {
            const errored = status(undefined, errorHappenedAction({ error: 'boom', message: 'it broke' }));
            const next = status(errored, clearMessageAction());
            assert.isNull(next.message);
            assert.deepEqual(next.error, {});
        } },
        { req: 'R2.3', title: 'without a message the clear action is hidden', run: () => {
            clearMessage();
            const element = mount('a-status');
            try {
                assert.isTrue(element.querySelector('button').hidden);
                errorHappened('boom', 'visible now');
                assert.isFalse(element.querySelector('button').hidden);
            } finally {
                clearMessage();
                element.remove();
            }
        } }
    ];
    for (const c of cases) it(`${c.req} — ${c.title}`, c.run);
});

// ---------------------------------------------------------------- preview

describe('preview · R1: render microdata', () => {
    it('R1.1 — the loaded event renders as a schema.org Event with all fields', () => {
        fillForm(fullEvent('preview-event'));
        const element = mount('a-preview');
        try {
            const article = element.shadowRoot.querySelector('article');
            assert.equal(article.getAttribute('itemtype'), 'http://schema.org/Event');
            const text = article.textContent;
            ['preview-event', 'preview-event workshop', 'airport muc', 'terminal 2', '2026-09-01', '2026-09-02']
                .forEach(expected => assert.include(text, expected));
            assert.equal(article.querySelector('a[itemprop=url]').getAttribute('href'), 'http://airhacks.com');
        } finally {
            element.remove();
        }
    });
    it('R1.2 — markup and styles are isolated from the page styles', () => {
        const element = mount('a-preview');
        try {
            assert.isNotNull(element.shadowRoot);
            assert.isNull(element.querySelector('article'));   // nothing leaks into the light DOM
        } finally {
            element.remove();
        }
    });
});

describe('preview · R2: copy the markup', () => {
    const stubClipboard = (state, captured) => {
        const originals = { query: navigator.permissions.query, write: navigator.clipboard.writeText };
        navigator.permissions.query = async () => ({ state });
        navigator.clipboard.writeText = async text => captured.push(text);
        return () => {
            navigator.permissions.query = originals.query;
            navigator.clipboard.writeText = originals.write;
        };
    };
    it('R2.1 — copies exactly the microdata markup, no styling, no controls', async () => {
        fillForm(fullEvent('copy-event'));
        const element = mount('a-preview');
        const captured = [];
        const restore = stubClipboard('granted', captured);
        try {
            await element.copyIntoClipboard();
            assert.lengthOf(captured, 1);
            assert.include(captured[0], 'copy-event');
            assert.include(captured[0], 'itemprop');
            assert.notInclude(captured[0], '<button');
            assert.notInclude(captured[0], '<style');
        } finally {
            restore();
            element.remove();
        }
    });
    it('R2.2 — denied clipboard access leaves the clipboard untouched', async () => {
        const element = mount('a-preview');
        const captured = [];
        const restore = stubClipboard('denied', captured);
        try {
            await element.copyIntoClipboard();
            assert.lengthOf(captured, 0);
        } finally {
            restore();
            element.remove();
        }
    });
});

// ---------------------------------------------------------------- system invariants

describe('system invariants', () => {
    it('S1 — the complete state is restored from local persistence after a restart', () => {
        fillForm(fullEvent('s1-event'));
        createEvent();
        save(store.getState());
        assert.deepEqual(load(), store.getState());
        localStorage.removeItem(STORAGE_KEY);
    });
    it('S2 — the system stays fully usable without the validator backend', async function () {
        if (await validatorReachable()) this.skip();
        await validate('http://airhacks.com');
        fillForm(fullEvent('s2-event'));
        createEvent();
        assert.include(listNames(), 's2-event');
        clearMessage();
    });
});

mocha.run();
