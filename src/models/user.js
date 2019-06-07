var mysqlConn = require("../database/database");

//Task object constructor
var User = function (user) {
  this.firstname = user.firstname;
  this.lastname = user.lastname;
  // this.cellPhone = user.cellPhone;
  this.email = user.email;
  this.password = user.password;
  // this.role = user.role;
  // this.date_created = user.new Date();
}

// class User {

//   constructor(firstname, lastname, email, password) {

//   }
// }
//------------------------------------Create User Function----------------------------------//
User.createUser = function (newUser, result) {
  mysqlConn.query("INSERT INTO user set ?", newUser, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

User.getUserByEmail = function (email, result) {
  mysqlConn.query("Select * from user where email = ?", email, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
}

User.getAllUsers = function (result) {
  mysqlConn.query("Select * from user", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Users : ", res);
      result(null, res);
    }
  });
};

User.getUserById = function (userId, result) {
  mysqlConn.query("Select * from user where id = ? ", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//------------------------------------Update User Function----------------------------------//
User.updateUserById = function (id, user, result) {
  mysqlConn.query("UPDATE user SET ? WHERE id = ?",
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
User.removeUser = function (userId, result) {
  mysqlConn.query("DELETE FROM user WHERE id = ?", userId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};



module.exports = User;
