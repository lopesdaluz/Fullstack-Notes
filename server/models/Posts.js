/*This file defines a Sequelize model called Posts, which represents a table in the database. 
It specifies the structure of the table, including the columns and their data types:

title: A string that cannot be null, used to store the title of the post.
postText: A string that cannot be null, used to store the main content of the post.
username: A string that cannot be null, used to store the name of the user who created the post.
*/

module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Posts;
};
