var vows = require('vows'),
    assert = require('assert');

var OrderedHash = require('./orderedhash');

vows.describe('Ordered Hash').addBatch({
    'Test length and size() are correct': {
        topic: new(OrderedHash),

        'length is correct': function (hash) {
            hash.set('k1', 'v1');
            hash.set('k2', 'v2');
            assert.equal(hash.length, 2)
            hash.remove('k1');
            assert.equal(hash.length, 1)
            hash.set('k3', 'v3');
            hash.shift();
            assert.equal(hash.length, 1)
         },
         'length equals size()': function(hash) {
            hash.set('k1', 'v1');
            hash.set('k2', 'v2');
            assert.equal(hash.length, hash.size())
            hash.remove('k1');
            assert.equal(hash.length, hash.size())
            hash.set('k3', 'v3');
            hash.shift();
            assert.equal(hash.length, hash.size())
         }
    },
    'Test hash is ordered': {
        topic: new(OrderedHash),

        'order of the hash is correct after adding multiple elements': function(hash) {
            hash.set('i', 'hihi');
            hash.set('a', 'haha');
            hash.set('e', 'hehe');
            hash.set(0, 'zero');
            var firstEl = hash.shift();
            assert.equal(firstEl[0], 'i');
            assert.equal(firstEl[1], 'hihi');
        }
    }
}).export(module);
    
