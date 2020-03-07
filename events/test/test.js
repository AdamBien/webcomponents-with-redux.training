mocha.setup('bdd');
const assert = chai.assert;

describe('#hello', function () { 
    it('world', function () { 
        assert.isTrue(true);
    })
    it('...', function () { 
        assert.isTrue(false);
    })
})

mocha.run();