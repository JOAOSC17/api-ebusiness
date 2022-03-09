const sql = require("../db.js");

const User = function(user) {
  console.log(user.name)
  if(typeof user.name !=='string' || !user.name ) throw ('Só é permitido string no campo de nome');
  if(typeof user.email !=='string' || !user.email) throw ('Só é permitido string no campo de email');
  if(typeof user.password_hash !=='string' || !user.password_hash) throw ('Só é permitido string no campo senha');
  if(typeof user.is_admin !=='boolean') throw ('Só é permitido boolean no campo de isAdmin');
  this.name = user.name ;
  this.email = user.email;
  this.password_hash = user.password_hash;
  this.is_admin = user.is_admin;
};
User.create = (newUser, result) => {
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return      
    }
    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};
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

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET name = ?, email = ?, password_hash = ?, is_admin = ? WHERE id = ?",
    [user.name, user.email, user.password_hash, user.is_admin, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};
User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found users: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
module.exports = User;