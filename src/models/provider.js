var mysqlConn = require("../database/database");

//Task object constructor
var Provider = function (provider) {
  this.firstname = provider.firstname;
  this.lastname = provider.lastname;
  // this.cellPhone = user.cellPhone;
  this.email = provider.email;
  this.password = provider.password;
  // this.role = user.role;
  // this.date_created = user.new Date();
}

//------------------------------------Create User Function----------------------------------//
Provider.createUser = function (newUser, result) {
  mysqlConn.query("INSERT INTO provider set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Provider.getUserByEmail = function (email, result) {
  mysqlConn.query("Select * from provider where email = ?", email, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

Provider.getAllUsers = function (result) {
  mysqlConn.query("Select * from provider", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

Provider.getUserById = function (userId, result) {
  mysqlConn.query("Select * from provider where id = ? ", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//------------------------------------Update User Function----------------------------------//
Provider.updateUserById = function (id, user, result) {
  mysqlConn.query("UPDATE provider SET ? WHERE id = ?",
    [user, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    });
};

//------------------------------------Delete User Function----------------------------------//
Provider.removeUser = function (userId, result) {
  mysqlConn.query("DELETE FROM provider WHERE id = ?", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};



module.exports = Provider;
