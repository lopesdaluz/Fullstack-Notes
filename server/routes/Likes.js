//import the express libary
const express = require("express");
//Create a new router object using express
const router = express.Router();
//import the likes model from the models folder
const { Likes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

//Route to handle likes/unlike on posts
router.post("/", validateToken, async (req, res) => {
  //extract postId from the request body
  const { PostId } = req.body;
  //Get UserId from the validated token(to be stored  in the req.user)
  const UserId = req.user.id;

  //Check if the user has already liked the post
  const found = await Likes.findOne({
    where: { PostId: PostId, UserId: UserId },
  });
  //If no like is found, create a new like in the likes table
  if (!found) {
    await Likes.create({ PostId: PostId, UserId: UserId });
    res.json({ liked: true });
  } else {
    //if like is found, remove the like from table(unlike)
    await Likes.destroy({
      where: { PostId: PostId, UserId: UserId },
    });
    res.json({ liked: false });
  }
});
//Export the router to be used in other parts of the application
module.exports = router;
