//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the posts model from the models folder
const { Posts } = require("../models");

//Route to get all posts from the database
router.get("/", async (req, res) => {
  //Fetch all posts from the Posts table
  const listOfPosts = await Posts.findAll();
  //Send the list of posts as a JSON response
  res.json(listOfPosts);
});

//Route to create a new post and add it to the database
router.post("/", async (req, res) => {
  //Get the data from the request body
  const post = req.body;
  //Use the posts model to create a new entry in the database
  await Posts.create(post);
  //Send the created post data back as a JSON response
  res.json(post);
});

//Export the router to be used in other parts of the application
module.exports = router;
