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
  const username = req.user.username;
  comment.username = username;
  await Comments.create(comment);
  res.json(comment);
});

// router.delete("/:commentId", validateToken, async (req, res) => {
//   const commentId = req.params.commentId;

//   await Comments.destroy({
//     where: {
//       id: commentId,
//     },
//   });
//   res.json("deleted successfully ");
// });
router.delete("/:commentId", validateToken, async (req, res) => {
  const commentId = req.params.commentId;

  // Check if commentId is valid
  if (!commentId || commentId === "undefined") {
    return res.status(400).json({ error: "Invalid comment ID" });
  }

  // Proceed with deletion if commentId is valid
  try {
    const result = await Comments.destroy({
      where: {
        id: commentId,
      },
    });

    if (result === 0) {
      return res.status(404).json({ error: "Comment not found" });
    }

    res.json("Deleted successfully");
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

//Export the router to be used in other parts of the application
module.exports = router;
