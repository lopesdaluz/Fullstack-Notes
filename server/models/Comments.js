/*This file defines a Sequelize model called comments, which represents a table in the database. 
It specifies the structure of the table, including the columns and their data types:

commentBody: A string that cannot be null, used to store the comments of the post.
*/

module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("Comments", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comments;
};
