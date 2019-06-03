const express = require("express");

const app = express();

var properties = new Array();

var users = new Array();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const usersRouter = require("./user/index");
app.use("/api/users", usersRouter);

app.get("/", (req, res) => {
    console.log(req.headers);
    res.send("<p>Hello</p>");
});

app.get("/properties", (req, res) => {
    // var properties = new Array();
    // properties.push({
    //     id: 1,
    //     name: "One",
    //     location: "Lisbon"
    // });
    res.json(properties);
});

app.post("/properties", (req, res) => {
    const property = req.body;
    properties.push(property);
    // res.send();
    res.json(property);
});





const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Server running on port ${PORT}`));

// app.listen(3000, (err) => {
//     if (err) {
//         console.log("Oops, error");
//         return;
//     }

//     console.log("Server listening port 3000");
// });

console.log("Bet.");