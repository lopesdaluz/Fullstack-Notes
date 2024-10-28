/*This file defines a Sequelize model called Users, which represents a table in the database. 
It specifies the structure of the table, including the columns and their data types:

title: A string that cannot be null, used to store the title of the post.
postText: A string that cannot be null, used to store the main content of the post.
username: A string that cannot be null, used to store the name of the user who created the post.
*/

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });
  };

  return Users;
};
