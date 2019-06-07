var Property = require("../models/property");

module.exports = class PropertyService {
  constructor() {}

  getProperties() {
    return new Promise((resolve, reject) => {
      Property.getAllProperties((err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  }
}