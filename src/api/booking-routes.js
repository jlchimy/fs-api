const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");

// const BookingService = require("../services/booking-service");
// const bookingService = new BookingService();

//-------------------------------------Request Booking Function------------------------------------//
router.post("/", (req, res) => {
  const booking = req.body;
  Booking.requestBooking(booking, (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({message: err.sqlMessage});
      } else {
        return res.status(500).json({message: "Failed to insert. Please try again."});
      }
    }
    return res.status(200).json({id: result});
  });
});

module.exports = router;