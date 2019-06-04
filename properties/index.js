const express = require("express");
const router = express.Router();

var fs = require("fs");

//------------------------------------Create Property Function-----------------------------------//
router.post("/", (req, res) => {
  const property = req.body;
  fs.readFile("./src/data/properties.json", function(err, data) {
    if (err) {
      throw err;
    } else {
      var newID = 0;
      var parseData = JSON.parse(data);
      if (parseData.properties.length > 0) {
        newID = parseData.properties[parseData.properties.length - 1];
        // parseData.properties.forEach(existingProp => {
        //   if (existingProp.name == property.name) {
        //     throw new Error("Name already in use!");
        //   } else {
        //     newID = existingProp.id;
        //   }
        // });
      }
      // Sets id to 1 + (id of last property), or 1 if none exist.
      const newProp = {
        id: (newID + 1),
        name: property.name,
        location: property.location,
        imgURL: property.imgURL,
        price: property.price,
      };
      parseData.properties.push(newProp);
      fs.writeFile("./src/data/properties.json", JSON.stringify(parseData), function(err) {
        if (err) {
          throw err;
        }
        console.log("-----Listing created-----");
        return res.status(200).json(newProp);
      });
    }
  });  
});

//------------------------------------Delete Property Function-----------------------------------//
router.delete("/:id", (req, res) => {
  fs.readFile("./src/data/properties.json", function(err, data) {
    if (err) {
      throw err;
    } else {
      var parseData = JSON.parse(data);
      if (parseData.properties.length > 0) {
        // Checks if id parameter is given/indicated and is a number.
        if (!req.params.id || isNaN(req.params.id)) {
          return res.status(400).json({message: "Please pass in a valid property ID"});
        }

        // Filters out element with param.id from properties.
        const len = parseData.properties.length;
        parseData.properties = parseData.properties.filter(
          property => !(property.id === parseInt(req.params.id)));

        // Checks if property existed by checking if number of properties changed.
        if (len == parseData.properties.length) {
          return res.status(400).json({ message: "Property with ID does not exist" });
        } 

        fs.writeFile("./src/data/properties.json", JSON.stringify(parseData), function(err) {
          if (err) {
            throw err;
          }
          res.status(200).json({ status: "Property deleted" });
          console.log("-----Deletion successful-----");
        });
      } else {
        throw new Error("No properties exist");
      }
    }
  });
});

//-------------------------------------Get Property Function-------------------------------------//
router.get("/:id", (req, res) => {
  fs.readFile("./src/data/properties.json", function(err, data) {
    if (err) {
      throw err;
    } else {
      var parseData = JSON.parse(data);
      if (parseData.properties.length > 0) {
        // Checks if id parameter is given/indicated and is a number.
        if (!req.params.id || isNaN(req.params.id)) {
          return res.status(400).json({ message: "Please pass in a valid property ID" });
        }

        var found = false;
        // Finds element with param.id from properties.
        for (var i = 0; i < parseData.properties.length; i++) {
          if (parseData.properties[i].id == req.params.id) {
            found = true;
            console.log("-----Property search successful-----");
            return res.status(200).json(parseData.properties[i]);
          }
        }
        if (!found) {
          return res.status(400).json({message: "Property not found"});
        }
      } else {
        throw new Error("No properties exist");
      }
    }
  });
});

//------------------------------------Create Booking Function------------------------------------//
router.post("/:id/bookings", (req, res) => {
  const booking = req.body;
  fs.readFile("./src/data/bookings.json", function(err, data) {
    if (err) {
      throw err;
    } else {
      var newID = 0;
      var parseData = JSON.parse(data);
      if (parseData.bookings.length > 0) {
        newID = parseData.bookings[parseData.bookings.length - 1].id;
      }
      // Sets id to 1 + (id of last booking), or 1 if none exist.
      const newBooking = {
        id: (newID + 1),
        dateFrom: booking.dateFrom,
        dateTo: booking.dateTo,
        userID: booking.userID,
        propertyID: parseInt(req.params.id),
        status: "NEW"
      };
      parseData.bookings.push(newBooking);
      fs.writeFile("./src/data/bookings.json", JSON.stringify(parseData), function(err) {
        if (err) {
          throw err;
        }
        console.log("-----Booking created-----");
        return res.status(200).json(newBooking);
      });
    }
  });  
});

//-------------------------------------Get Bookings Function--------------------------------------//
router.get("/:id/bookings", (req, res) => {
  fs.readFile("./src/data/bookings.json", function(err, data) {
    if (err) {
      throw err;
    } else {
      var parseData = JSON.parse(data);
      if (parseData.bookings.length > 0) {
        // Checks if id parameter is given/indicated and is a number.
        if (!req.params.id || isNaN(req.params.id)) {
          return res.status(400).json({ message: "Please pass in a valid property ID" });
        }

        // var bookings = new Array();
        // Finds bookings with param.id from properties.
        // parseData.bookings.forEach(booking => {
        //   if (booking.propertyID === parseInt(req.params.id)) {
        //     found = true;
        //     bookings.push(booking);
        //   }
        // });

        var bookings = parseData.bookings.filter(booking => 
          booking.propertyID === parseInt(req.params.id));

        if (bookings.length == 0) {
          return res.status(400).json({message: "No bookings found"});
        } else {
          return res.status(200).json(bookings);
        }
      } else {
        throw new Error("No bookings exist");
      }
    }
  });
});

module.exports = router;