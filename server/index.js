//Import the Express libary
const express = require("express");
//Create an instance of an Express application
const app = express();
const cors = require("cors");

//Middleware to parse incoming JSON request
app.use(express.json());
app.use(cors());

//Import the database configuration and models
const db = require("./models");

//ROUTER - import routers for handling different endpoints

//Import the posts router from the routes folder
const postRouter = require("./routes/Posts");
//Use the posts router for any requests to the /posts endpoint
app.use("/posts", postRouter);
//Import the comments router from the routes folder
const commentsRouter = require("./routes/Comments");
//Use the comments router for any requests to the /comments endpoint
app.use("/comments", commentsRouter);
//Import the users router from the routes folder
const usersRouter = require("./routes/Users");
//Use the posts router for any requests to the /users endpoint
app.use("/auth", usersRouter);
const likesRouter = require("./routes/Likes");
//Use the likes router for any requests to the /likes endpoint
app.use("/likes", likesRouter); //where we call all the endpoints for likes

//Synchronize the database models and start the server
db.sequelize.sync().then(() => {
  //Start the server on port 3001
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});

// // Synchronize the database models and start the server
// db.sequelize.sync({ force: true }).then(() => {
//   // Add { force: true } here
//   // Start the server on port 3001
//   app.listen(3001, () => {
//     console.log("Server running on port 3001");
//   });
// });
