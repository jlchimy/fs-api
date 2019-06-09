const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Creates a router for users
const usersRouter = require("./src/api/user-routes"); 
app.use("/api/users", usersRouter);

// Creates a router for properties
const propRouter = require("./src/api/property-routes");
app.use("/api/properties", propRouter);

// Creates a router for providers
const providerRouter = require("./src/api/provider-routes");
app.use("/api/providers", providerRouter);

// Creates a router for bookings
const bookingRouter = require("./src/api/booking-routes");
app.use("/api/bookings", bookingRouter);


// Initializing the port.
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

console.log("Bet.");
