const express = require("express");
const app = express();
const path = require("path");

const user = require("./models/user");

// serving the static files
app.use("/static", express.static("static"));
app.use(express.urlencoded({ extended: false }));
// pug specific stuff
app.set("view engine", "pug"); // seting up the template engine
app.set("views", path.join(__dirname, "views")); // setting up the views directory

// connecting mongodb to the nodejs

const mongoose = require("mongoose");
const { request } = require("http");
const e = require("express");

// Replace 'your_database_url' with your actual MongoDB connection URL
mongoose
  .connect("mongodb://0.0.0.0/admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// End points
app.get("/", (req, res) => {
  res.render("index.pug");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

// create a new user in our data base

app.post("/register", async (req, res) => {

  try {
    const password = req.body.password;
    const cPassword = req.body.confirmPassword;

    if (password === cPassword) {
      const registerUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: password,
        confirmPassword: cPassword
      });

      const registered = await registerUser.save();
      
      res.status(201).render("index");
    } else {
      res.status(400).send("Passwords do not match");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


// start the server
const port = 3000;
app.listen(port, () => {
  console.log(`the server is running on http://localhost:${port}`);
});
