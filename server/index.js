//Import the Express libary
const express = require("express");
//Create an instance of an Express application
const app = express();

//Middleware to parse incoming JSON request
app.use(express.json());

//Import the database configuration and models
const db = require("./models");

//ROUTER
//Import the posts router from the routes folder
const postRouter = require("./routes/Posts");
//Use the posts router for any requests to the /posts endpoint
app.use("/posts", postRouter);

//Synchronize the database models and start the server
db.sequelize.sync().then(() => {
  //Start the server on port 3001
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
