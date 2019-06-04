const express = require("express");

const app = express();

var properties = new Array();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Creates a router for users in users/index.js
const usersRouter = require("./users/index");
app.use("/api/users", usersRouter);

// Creates a router for properties in properties/index.js
const propRouter = require("./properties/index");
app.use("/api/properties", propRouter);

app.get("/", (req, res) => {
    console.log(req.headers);
    res.send("<p>Hello</p>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

console.log("Bet.");