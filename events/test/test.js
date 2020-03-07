import matchesCriteria from "./overview/entity/Filter.js";
mocha.setup('bdd');
const assert = chai.assert;

describe('#overview.entity.Filter', function () { 
    it('matchesCriteria_true_emptyEvent', function () { 
        assert.isTrue(matchesCriteria({},''));
    })
})

mocha.run();