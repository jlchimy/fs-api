const express = require("express");
const router = express.Router();

// const ValidationService = require("./src/services/validation-service");
// const validationService = new ValidationService();

var fs = require("fs");

router.get("/", (req, res) => {
    res.send("Users default path");
});

router.post("/register", (req, res) => {
    const user = req.body;
    // if (!validationService.isValidRegisterBody(user)) {
    //     throw new Error("Invalid payload");
    // }
    fs.readFile("./src/data/data.json", function(err, data) {
      if (err) {
        throw err;
      } else {
        var newID = 0;
        if (data.length > 0) {
          var parseData = JSON.parse(data);
          parseData.users.forEach(existingUser => {
            if (existingUser.email == user.email) {
              throw new Error("Email already in use!");
            } else {
              newID = parseInt(existingUser.id);
            }
          });
        }
        const newUser = {
          id: (newID + 1).toString(),
          name: user.name,
          surname: user.surname,
          cellPhone: user.cellPhone,
          email: user.email,
          password: user.password,
          role: user.role
        };
        parseData.users.push(newUser);
        res.json(user);
        fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
          if (err) {
              throw err;
          }
          console.log("-----Registration successful-----");
          return parseData.users;
        });
      }
    });
  
  });
  
router.post("/login", (req, res) => {
  const user = req.body;
  if (!validationService.isValidRegisterBody(user)) {
    throw new Error400("Invalid payload");
  }
  fs.readFile("./src/data/data.json", function(err, data) {
    if (err) {
      throw err;
    } else {
      if (data.length > 0) {
        var parseData = JSON.parse(data);
        parseData.users.forEach(existingUser => {
          if (existingUser.email == user.email && existingUser.password == user.password) {
            console.log("-----Login successful-----");
            res.json();
            return;
          }
        });
      } else {
        throw new Error("No users exist");
      }
    }
  });
});

  router.post("/update", (req, res) => {
    const user = req.body;
    fs.readFile("./src/data/data.json", function(err, data) {
      if (err) {
        throw err;
      } else {
        if (data.length > 0) {
          var parseData = JSON.parse(data);
          parseData.users = parseData.users.filter(existingUser => {
            return existingUser.email !== user.email;
          });
    
          const updateUser = {
            id: user.id,
            name: user.name,
            surname: user.surname,
            cellPhone: user.cellPhone,
            email: user.email,
            password: user.password,
            role: user.role
          };
    
          parseData.users.push(updateUser);
          fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
            if (err) throw err;
            res.json(updateUser);
            console.log("-----User updated successfully-----");
          });
        } else {
            throw new Error("No users exist");
        }
      }
    });
  });

  router.post("/delete/:id", (req, res) => {
    fs.readFile("./src/data/data.json", function(err, data) {
        if (err) {
          throw err;
        } else {
          if (data.length > 0) {
            var parseData = JSON.parse(data);
            parseData.users = parseData.users.filter(user => !(user.id === req.params.id));

            fs.writeFile("./src/data/data.json", JSON.stringify(parseData), function(err) {
                if (err) {
                    throw err;
                }
                res.json({ status: "User deleted" });
                console.log("-----Deletion successful-----");
            });
          } else {
              throw new Error("No users exist");
          }
        }
    });
  });

module.exports = router;