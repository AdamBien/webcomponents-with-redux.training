import matchesCriteria from "./overview/entity/Filter.js";
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

mocha.run();