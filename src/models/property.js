var mysqlConn = require("../database/database");

//Task object constructor
var Property = function (property) {
  this.name = property.name,
  this.location = property.location,
  // this.description = property.description,
  this.imgURL = property.imgURL,
  this.price = property.price
}

//------------------------------------Create Property Function----------------------------------//
Property.createProperty = function (newProperty, result) {
  mysqlConn.query("INSERT INTO property set ?", newProperty, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Property.getAllProperties = function (result) {
  mysqlConn.query("Select * from property", function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log("Properties : ", res);
      result(null, res);
    }
  });
};

Property.getPropertyById = function (propertyId, result) {
  mysqlConn.query("Select * from property where id = ? ", propertyId, function (
    err,
    res
  ) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      result(null, res);
    }
  });
};

//------------------------------------Update Property Function----------------------------------//
Property.updatePropertyById = function (id, property, result) {
  mysqlConn.query("UPDATE property SET ? WHERE id = ?",
    [property, id],
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
Property.removeProperty = function (propertyId, result) {
  mysqlConn.query("DELETE FROM property WHERE id = ?", propertyId, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

module.exports = Property;
