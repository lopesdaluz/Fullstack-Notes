//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the posts model from the models folder
const { Posts, Likes } = require("../models");

//Route to get all posts from the database
router.get("/", async (req, res) => {
  //Fetch all posts from the Posts table
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  //Send the list of posts as a JSON response
  res.json(listOfPosts);
});

//Route to get a singe post by its ID
router.get("/byId/:id", async (req, res) => {
  //Extract the post ID from the route parameters
  const id = req.params.id;
  //use the findbyPK method to  find a post by its primary key
  const post = await Posts.findByPk(id);
  //Send the found post as a JSON response
  res.json(post);
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
