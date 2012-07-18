OrderedHash
===========

An ordered hash for node.js

Usage:
  1 Initialize a ordered hash
    var hash = new OrderedHash();
  2 Add a element to the hash
    hash.set('key1', 'value1');
  3 Remove a element from the hash
    hash.remove('key1');
  4 Loop through the hash
    hash.each(fucntion(key, value) {
      console.log(key + '=' + value);
    });
  5 Clear the hash
    hash.clear();
  6 Get the first key-value pair in the hash, in the format of [key, value];
    var firstEl = hash.shift();
    console.log(firstEl.join('=');
    // The result will be 'key1=value1'