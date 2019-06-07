const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Creates a router for users in users/index.js
const usersRouter = require("./src/api/user-routes"); 
app.use("/api/users", usersRouter);

// Creates a router for properties in properties/index.js
const propRouter = require("./src/api/property-routes");
app.use("/api/properties", propRouter);


// Initializing the port.
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

console.log("Bet.");
