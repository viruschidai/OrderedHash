function isFunction(f) {
	var getType = {};
	return f && getType.toString.call(f) == '[object Function]';
};

OrderedHash = OrderedHash = function() {
	this.init();
};

OrderedHash.prototype = {
	init: function() {
		this._keys = [];
		this._values = [];
		this.length = 0;
	},
	clear: function() {
		this.init();
	},
	each: function(callback) {
		for (var key in this._keys) {
			callback(key, this._values[key]);
		}
	},
	each_key: function(callback) {
		for (var key in this._keys) {
			callback(key);
		}
	},
	each_value: function(callback) {
		for (var key in this._keys) {
			callback(this._values[key]);
		}
	},
	empty: function() {
		return this.size() === 0;	
	}, 
	fetch: function(key, block) {
		if (this.has(key)) {
			return this._values[key];
		} else {
			if (block === undefined) return null;
			
			if (isFunction(block)) {
				return block();
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
		return this._keys.indexOf(key) > -1;
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

		this._keys.splice(index, 0, value);	
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
