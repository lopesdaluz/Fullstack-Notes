//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the users model from the models folder
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

//Registration
//the endpoint listens for a post request in this route. Get  the object username and password and assigns them
//to variables and hashes the password. and store the new user in the database with json with a message
router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

//Login
//Route to log in by checking credentials against the database
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "User Doesn't Exist" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Wrong Username And Password Combination" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    res.json(accessToken);
  });
});

//Export the router to be used in other parts of the application
module.exports = router;
