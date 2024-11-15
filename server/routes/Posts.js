//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the posts model from the models folder
const { Posts, Likes } = require("../models");
const { validateToken } = require("..//middlewares/AuthMiddlewares");

//Route to get all posts from the database
router.get("/", validateToken, async (req, res) => {
  //Fetch all posts from the Posts table
  const listOfPosts = await Posts.findAll({ include: [Likes] });
  const likedPosts = await Likes.findAll({ where: { UserId: req.user.id } });
  //Send the list of posts as a JSON response
  res.json({ listOfPosts: listOfPosts, likedPosts: likedPosts });
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

//Route to get all the post by its ID
router.get("/byuserId/:id", async (req, res) => {
  //Extract the post ID from the route parameters
  const id = req.params.id;
  //use the findbyPK method to  find a post by its primary key
  const listOfPosts = await Posts.findAll({
    where: { UserId: id },
    include: [Likes],
  });
  //Send the found post as a JSON response
  res.json(listOfPosts);
});

//Route to create a new post and add it to the database
//The validateToken middlewear to check the token is valid
//take the user data like username and associate it with the post
//saves the post
//sends the new post back as a JSON response to the frontend
//when the post request in component(createPost) send the request here it comes with the username from user object in validateToken and associate the username with the post
//take the post and create a new post in the post database and respond back with JSON
router.post("/", validateToken, async (req, res) => {
  //Get the data from the request body
  const post = req.body;
  post.username = req.user.username;
  post.UserId = req.user.id;
  //Use the posts model to create a new entry in the database
  await Posts.create(post);
  //Send the created post data back as a JSON response
  res.json(post);
});

//Routes for when wanna edit title in the posts
router.put("/title", validateToken, async (req, res) => {
  //Get the data from the request body
  const { newTitle, id } = req.body;
  await Posts.update({ title: newTitle }, { where: { id: id } });

  res.json(newTitle);
});

//Routes for when wanna edit the text in the posts
router.put("/postText", validateToken, async (req, res) => {
  //Get the data from the request body
  const { newText, id } = req.body;
  await Posts.update({ postText: newText }, { where: { id: id } });

  res.json(newText);
});

//Route to delete a post
router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});
//Export the router to be used in other parts of the application
module.exports = router;
