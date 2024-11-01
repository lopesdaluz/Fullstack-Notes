//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the posts model from the models folder
const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

//Route to get a singe post by its ID
router.get("/:postId", async (req, res) => {
  //Extract the post ID from the route parameters
  const postId = req.params.postId;
  //use the findbyPK method to  find a post by its primary key
  const comments = await Comments.findAll({ where: { PostId: postId } });
  //Send the found post as a JSON response
  res.json(comments);
});

//it will receive the request and go through all the checks and see if its correct and next validation is called
router.post("/", validateToken, async (req, res) => {
  const comment = req.body;
  await Comments.create(comment);
  res.json(comment);
});
//Export the router to be used in other parts of the application
module.exports = router;
