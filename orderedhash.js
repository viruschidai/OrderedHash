function isFunction(f) {
	var getType = {};
	return f && getType.toString.call(f) == '[object Function]';
};

/**
* A hash that perservs the order of elements
* 
* @class OrderedHash
* @constructor
*/
OrderedHash = OrderedHash = function() {
	this.init();
};

OrderedHash.prototype = {

    /**
    * Initialize the hash
    *
    * @method init
    */
	init: function() {
		this._keys = [];
		this._values = [];
		this.length = 0;
	},
    /**
    * Clear all elements in the hash
    *
    * @method clear
    */
	clear: function() {
		this.init();
	},
    /**
    * Calls callback function on each key in the hash, passing the key-value pair as parameters. 
    *
    *      var hash =  new OrderedHash();
    *      hash.set('key1', 'value1');
    *      hash.set('key2', 'value2');
    *      hash.each(function(key, value) {
    *           console.log(key + ' = ' + value);
    *      });
    *
    * @method each
    * @param {Function} callback  A callback function will be called on each key-value pair. 
    */
	each: function(callback) {
		for (var i=0; i<this.length; i++) {
            var key = this._keys[i];
			callback(key, this._values[key]);
		}
	},
    /**
    * Calls callback function on each key in the hash, passing only the key as parameter. 
    *
    *      var hash =  new OrderedHash();
    *      hash.set('key1', 'value1');
    *      hash.set('key2', 'value2');
    *      hash.each_key(function(key) {
    *           console.log('key = ' + key);
    *      });
    *
    * @method each_key
    * @param {Function} callback  A callback function will be called on each key
    */
	each_key: function(callback) {
		for (var i=0; i<this.length; i++) {
			callback(this._keys[i]);
		}
	},
    /**
    * Calls callback function on each value in the hash, passing only the value as parameter. 
    *
    *      var hash =  new OrderedHash();
    *      hash.set('key1', 'value1');
    *      hash.set('key2', 'value2');
    *      hash.each_value(function(value) {
    *           console.log('value = ' + value);
    *      });
    *
    * @method each_value
    * @param {Function} callback 
    */
	each_value: function(callback) {
		for (var i=0; i<this.length; i++) {
            var key = this._keys[i];
			callback(this._values[key]);
		}
	},
    /**
    * Check whether the hash is empty
    *
    * @method empty
    * @return {Boolean} Returns true when there is no element in the hash
    */
	empty: function() {
		return this.size() === 0;	
	}, 
    /**
    * Fetch an element in the hash and do something else if the element does not exist
    * fetch(key[, default])  
    *
    *      var hash =  new OrderedHash();
    *      hash.set('key1', 'value1');
    *      var value = hash.fetch('key2', 'value2');
    *      console.log(value); // the value will be 'value2' although it does not exist in the hash
    *   
    * fetch(key, callback(key))
    *
    *      var hash =  new OrderedHash();
    *      hash.set('key1', 'value1');
    *      var value = hash.fetch('key2', function(key){
    *           return 'value2';
    *      });
    *      console.log(value); // the value will be 'value2' although it does not exist in the hash
    *
    * @method fetch 
    * @return {Boolean} Returns true when there is no element in the hash
    */
	fetch: function(key, block) {
		if (this.has_key(key)) {
			return this.get(key); 
		} else {
			if (block === undefined) return null;
			
			if (isFunction(block)) {
				return block(key);
			} else {
				return block;
			}
		}
	},
	flatten: function() {
		var ret = [];

		this.each(function(key, value) {
			ret.push(key);
			ret.push(value);
		});

		return ret;
	},
	get: function(key) {
		return this._values[key];
	},
	has_key: function(key) {
		return (this._keys.indexOf(key) >= 0);
	},
	has_value: function(value) {
		for (var key in this._values) {
			if (this._values[key] === value) 
			{
				return true;
			}
		}

		return false;
	},
	keys: function() {
		return this._keys;
	},
	insert: function(index, key, value) {
		if (this.has_key(key)) {
			throw "Key[" + key + "] already exists";
		};

		this._keys.splice(index, 0, key);	
		this._values[key] = value;
		this.length++;
	},
	map: function(callback) {
		var ret = [];

		this.each(function(key, value) {
			ret.push(callback(key, value));
		});

		return ret;		
	},
	remove: function(key) {
		var index = this._keys.indexOf(key);

		if (index > -1) {
			this._keys.splice(index, 1);
			delete this._values[key];
			this.length--;
		}
	},
	set: function(key, value){
		var index = this._keys.indexOf(key);

		if (index < 0) {
			this._keys.push(key);
			this.length++;
		};

		this._values[key] = value;
	},	
	shift: function() {
		if (this.size() > 0) {
			var key = this._keys[0];
			var value = this._values[key];
			this.remove(key);
			return [key, value];
		} else {
			throw "You cannot call shift on an empty hash";
		}
	},
	size: function() {
		return this._keys.length;
	},
	toString: function() {
		
	},
	values: function() {
		var ret = [];

		this.each_value(function(value) {
			ret.push(value);
		});

		return ret;
	}
};

module.exports = exports = OrderedHash;
