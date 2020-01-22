// import orm.js into burger.js

// create code that will call the ORM functions using burger specific input for the ORM.

//export

var orm = require("../config/orm.js");
var burgers = {
	selectAll: function(cb){
		orm.selectAll("burgers", function(res){
			cb(res);
		});
	},

	insertOne: function(cols,vals,cb){
		orm.insertOne("burgers", cols, vals, function(res){
			cb(res);
		});
	},

	updateOne: function(objColVals, condition, cb){
		orm.updateOne("burgers", objColVals, condition, function(res){
			cb(res);
		});
	},
};

module.exports = burgers;