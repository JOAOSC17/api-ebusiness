const sql = require("../db.js");

// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.pasword_hash = user.pasword_hash;
  this.is_admin = user.is_admin
};

// Tutorial.create = (newTutorial, result) => {
//   sql.query("INSERT INTO tutorials SET ?", newTutorial, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     console.log("created tutorial: ", { id: res.insertId, ...newTutorial });
//     result(null, { id: res.insertId, ...newTutorial });
//   });
// };
User.getAll = (result) => {
  let query = "SELECT * FROM users";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

module.exports = User;