//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the users model from the models folder
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddlewares");
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

    // The token is the characters to represent a user. The token is send to sessionStorage  where the data
    // is while being on the page and it helps with that you dont have to log in again while being on the page
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );

    res.json({ token: accessToken, username: username, id: user.id });
  });
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(basicInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    // Find the user by their username
    const user = await Users.findOne({
      where: { username: req.user.username },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare old password with stored password
    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) {
      return res.json({ error: "Wrong Password Entered" });
    }

    // Hash new password and update in the database
    const hash = await bcrypt.hash(newPassword, 10);
    await Users.update(
      { password: hash },
      { where: { username: req.user.username } }
    );

    // Respond with success
    console.log("PAssword update successfully for user:", req, user.username);
    res.json({ message: "password changed successfully" });
  } catch (error) {
    console.error("Password change error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while changing the password" });
  }
});

//Export the router to be used in other parts of the application
module.exports = router;
