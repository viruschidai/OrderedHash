var vows = require('vows'),
    assert = require('assert');

var OrderedHash = require('./orderedhash');

vows.describe('Ordered Hash').addBatch({
    'Test basic methods': {
        topic: function() {
            var hash = new(OrderedHash);
            hash.set('k1', 'v1');
            hash.set('k2', 'v2');
            hash.set('k3', 'v3');

            return hash;
        },
        'Operational methods': { 
            'Method "insert" should insert an element to specified position': function(hash) {
                hash.insert(0, 'k4', 'v4');
                var ret = hash.shift().join('=');
                assert.equal(ret, 'k4=v4');
            },
            'Method "fetch" should return the value for the spcified key': function(hash) {
                var value = hash.fetch('k3');
                assert.equal(value, 'v3');
            },
            'Method "fetch" should return default value when the key is not in the hash': function(hash) {
                var value = hash.fetch('k6', 'v6');
                assert.equal(value, 'v6');
            },
            'Method "fetch" should return result of passed in callback functin': function(hash) {
                var value = hash.fetch('k7', function(key) {
                    return 'LOL' + key;
                });
                assert.equal(value, 'LOLk7');
            },
            'Method "clear" should remove all elements in the hash': function(hash) {
                assert.equal(hash.size(), 3);
                hash.clear();
                assert.equal(hash.size(), 0);
            }
        }
    },
    'Test length and size() are correct': {
        topic: new(OrderedHash),

        'Length is correct after adding/removing elements?': function (hash) {
            hash.set('k1', 'v1');
            hash.set('k2', 'v2');
            assert.equal(hash.length, 2);

            hash.remove('k1');
            assert.equal(hash.length, 1);

            hash.set('k3', 'v3');
            hash.shift();
            assert.equal(hash.length, 1);

            hash.insert(0, 'k0', 'v0');
            assert.equal(hash.length, 2);
         },
         'Length equals size()': function(hash) {
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

        'Order of the hash is correct after adding multiple elements?': function(hash) {
            hash.set('i', 'hihi');
            hash.set('a', 'haha');
            hash.set('e', 'hehe');
            hash.set(0, 'zero');

            var firstEl = hash.shift();
            assert.equal(firstEl[0], 'i');
            assert.equal(firstEl[1], 'hihi');
        },
    },
    'Test loop methods': {
        topic: function() {
                  var hash =  new(OrderedHash);
                  hash.set('i', 'hihi');
                  hash.set('a', 'haha');
                  hash.set('e', 'hehe');

                  return hash;
               },

        'Method "each" is working as expected?': function(hash) {
            var keyStr='', valueStr='';

            hash.each(function(key, value) {
                keyStr += key;
                valueStr += value;
            });

            assert.equal(keyStr, 'iae');
            assert.equal(valueStr, 'hihihahahehe');
        },
        'Method "each_key" is working as expected?': function(hash) {
            var keyStr='';

            hash.each_key(function(key) {
                keyStr += key;
            });

            assert.equal(keyStr, 'iae');
        },
        'Method "each_value" is working as expected?': function(hash) {
            var valueStr='';

            hash.each_value(function(value) {
                valueStr += value;
            });

            assert.equal(valueStr, 'hihihahahehe');
        },
        'Method "map" works as expected?': function(hash) {
            var pairsStr = hash.map(function(key, value) {
                        return key + "=" + value;
                    }).join('&');

            assert.equal(pairsStr, 'i=hihi&a=haha&e=hehe');
        }

    }

}).export(module);
