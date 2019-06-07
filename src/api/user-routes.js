const express = require("express");
const router = express.Router();
const User = require("../models/user");

const ValidationService = require("../services/validation-service");
const validationService = new ValidationService();

const UserService = require("../services/user-service");
const userService = new UserService();

//-------------------------------------Get All Users Function------------------------------------//
router.get("/", (req, res) => {
  userService
    .getUsers()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      res.status(400).json({ message: err.message });
    });
});

//-------------------------------------Register User Function------------------------------------//
router.post("/", (req, res) => {
  const user = req.body;
  // if (!validationService.isValidRegisterBody(user)) {
  //   throw new Error("Invalid payload");
  // }
  User.createUser(user, (err, result) => {
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


//--------------------------------------User Login Function--------------------------------------//
router.post("/authentication", (req, res) => {
  const user = req.body;
  // if (!validationService.isValidRegisterBody(user)) {
  //   throw new Error("Invalid payload");
  // }
  if (!user.email) {
    return res.status(400).json({message: "Please enter an email"});
  } else if (!user.password) {
    return res.status(401).json({message: "Please enter a password"});
  }
  User.getUserByEmail(user.email, (err, result) => {
    if (err || result.length == 0) {
      return res.status(402).json({ message: "Email not found."});
    }
    console.log(result);
    if (result[0].password === user.password) {
      return res.status(200).json({id: result});
    } else {
      return res.status(403).json({message: "Incorrect Password."});
    }
  });
});


//--------------------------------------Update User Function-------------------------------------//
router.post("/update/:id", (req, res) => {
  const user = req.body;
  User.updateUserById(parseInt(req.params.id), user, (err, result) => {
    console.log(err);
    console.log(result);
  });
  res.status(200).json(user);
});


//--------------------------------------Delete User Function-------------------------------------//
router.delete("/:id", (req, res) => {
  User.removeUser(parseInt(req.params.id), (err, result) => {
    console.log(err);
    console.log(result);
  });
  res.status(200).json({ status: "User deleted" });
});

module.exports = router;