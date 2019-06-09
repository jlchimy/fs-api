var mysqlConn = require("../database/database");

//Task object constructor
var Booking = function (booking) {
  this.dateFrom = booking.dateFrom,
  this.dateTo = booking.dateTo,
  this.status = booking.status
}

//------------------------------------Request Booking Function----------------------------------//
Booking.requestBooking = function (newBooking, result) {
  mysqlConn.query("INSERT INTO booking set ?", newBooking, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};