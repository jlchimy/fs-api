const express = require("express");
const router = express.Router();
const Property = require("../models/property");

const PropertyService = require("../services/property-service");
const propertyService = new PropertyService();

//-------------------------------------Get All Properties Function------------------------------------//
router.get("/", (req, res) => {
  propertyService
  .getProperties()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    res.status(400).json({ message: err.message });
  });
});

//-------------------------------------Create Property Function------------------------------------//
router.post("/", (req, res) => {
  const property = req.body;
  Property.createProperty(property, (err, result) => {
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


//--------------------------------------Update Property Function-------------------------------------//
router.post("/update/:id", (req, res) => {
  const property = req.body;
  Property.updatePropertyById(parseInt(req.params.id), property, (err, result) => {
    console.log(err);
    console.log(result);
  });
  res.status(200).json(property);
});


//--------------------------------------Delete Property Function-------------------------------------//
router.delete("/:id", (req, res) => {
  Property.removeProperty(parseInt(req.params.id), (err, result) => {
    console.log(err);
    console.log(result);
  });
  res.status(200).json({ status: "Property deleted" });
});

module.exports = router;