window.utils = {
	isNull: function(obj) {
		return !utils.notNull(obj);
	},

	notNull: function(obj) {
		if(typeof(obj) === "string") {
			return obj != null && obj != undefined && obj.length > 0;
		}

		return obj != null && obj != undefined;
	},

	whenNotNull: function(obj, callback) {
		if(utils.notNull(obj)) {
			callback();
		}
	}
};