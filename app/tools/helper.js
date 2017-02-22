var _helper = {
	// fill schema with data values
    fill: function (data, schema) {
        for (var prop in data.body) {
            if (!data.body.hasOwnProperty(prop)) continue;
            schema[prop] = data.body[prop];
        }
        return schema;
    },
    fillSocket: function (data, schema) {
        for (var prop in data) {
            if (!data.hasOwnProperty(prop)) continue;
            schema[prop] = data[prop];
        }
        return schema;
    },
	ObjtoArr: function(obj) {
		return arr = Object.keys(obj).map(function (key) {
      return obj[key];
    });
	}
}

module.exports = _helper;
