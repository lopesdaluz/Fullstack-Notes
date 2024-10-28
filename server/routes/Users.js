//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the posts model from the models folder
const { Users } = require("../models");

//Route to create a new post and add it to the database
router.post("/", async (req, res) => {
  const { username, password } = req.body;
});

//Export the router to be used in other parts of the application
module.exports = router;
