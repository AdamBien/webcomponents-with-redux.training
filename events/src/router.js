/**
 * Standards-based client-side router: URLPattern matches routes, the
 * Navigation API intercepts same-origin navigations (link clicks,
 * back/forward, programmatic navigation.navigate()) with built-in focus and
 * scroll handling. Route changes animate with same-document view transitions
 * where supported; reduced motion renders instantly.
 *
 * Non-matching and cross-origin URLs fall through to regular browser
 * navigation, and reloads are never intercepted — the server must serve
 * index.html for unknown paths (deep links).
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API}
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/URLPattern}
 */

/**
 * @param {HTMLElement} outlet - the element whose content is replaced with the routed component
 * @param {Array<{path: string, component: string}>} routeConfig - maps URL paths to custom element tag names
 */
export const initRouter = (outlet, routeConfig) => {
    const routes = routeConfig.map(({ path, component }) => ({
        pattern: new URLPattern({ pathname: path }),
        component
    }));

    /**
     * @param {URL} url
     * @returns {boolean} whether a route matched and rendered
     */
    const render = url => {
        const route = routes.find(({ pattern }) => pattern.test(url));
        if (!route) return false;
        outlet.replaceChildren(document.createElement(route.component));
        return true;
    };

    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');

    /**
     * @param {URL} url
     * @returns {(boolean|Promise)} render result, wrapped in a view transition where supported
     */
    const transitionTo = url => {
        if (!document.startViewTransition || reducedMotion.matches) return render(url);
        return document.startViewTransition(() => render(url)).finished;
    };

    navigation.addEventListener('navigate', event => {
        if (!event.canIntercept || event.hashChange || event.downloadRequest) return;
        const url = new URL(event.destination.url);
        if (!routes.some(({ pattern }) => pattern.test(url))) return;
        event.intercept({ handler: () => transitionTo(url) });
    });

    render(new URL(location.href));
}
