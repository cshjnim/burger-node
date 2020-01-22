//require connection.js into orm.js
var connection = require("./connection.js");

// create the methods that will execute the necessary MySQL commands in the controllers. These are the methods you will need to use in order to retrieve and store data in your database.

function printQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }
  return arr.toString();
}

// Helper function for generating My SQL syntax
function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    arr.push(key + "=" + ob[key]);
  }
  return arr.toString();
}

var orm = {
  //* `selectAll()`
  selectAll: function(tableInput, cb) {
    var queryString = "SELECT * FROM " + tableInput + ";";

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //* `insertOne()`
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  //* `updateOne()`
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  }
};

//export the orm object in module.exports
module.exports = orm;
