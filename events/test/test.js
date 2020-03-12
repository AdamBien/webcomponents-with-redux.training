import matchesCriteria from "./overview/entity/Filter.js";
import { deleteSelected } from "./overview/entity/EventOperations.js";
mocha.setup('bdd');
const assert = chai.assert;

const webEvent = {
    eventname: "Web Components",
    description: "Airport MUC Workshops",
    link: "http://airhacks.com"
}

describe('#overview.entity.Filter', function () { 
    it('matchesCriteria_true_emptyEvent', function () { 
        assert.isTrue(matchesCriteria({},''));
    })
    it('matchesCriteria_true_webEvent_and_emptyFilter', function () { 
        assert.isTrue(matchesCriteria(webEvent,''));
    })
    
    it('matchesCriteria_true_webEvent_and_matchingFilter', function () { 
        assert.isTrue(matchesCriteria(webEvent,'http://airhacks.com'));
    })

    it('matchesCriteria_true_webEvent_and_partiallyMatchingFilter', function () { 
        assert.isTrue(matchesCriteria(webEvent,'airhacks.com'));
    })

    it('matchesCriteria_true_webEvent_and_partiallyMatchingFilter_IgnoreCase', function () { 
        assert.isTrue(matchesCriteria(webEvent,'web'));
    })

})

describe('#overview.entity.EventOperations', function () {
    const input = [
        {
            link: 'http://adambien.blog',
            eventname: 'test',
            description: 'next',
            checked: false
        },
        {
            link: 'http://airhacks.com',
            eventname: 'airhacks',
            description: 'at airport',
            checked: true
        }
    ];

    it('deleteSelected_checkedEventsAreNotReturned', function () { 
        const result = deleteSelected(input);
        assert.lengthOf(result, 1);
        assert.include(result,input[0]);
    })
})

mocha.run();