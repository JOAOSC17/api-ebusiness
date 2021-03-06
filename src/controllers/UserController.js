const User = require("../models/User")
const bcryptjs =require('bcryptjs')
exports.findAll = (req, res) => {
  console.log(req.userId, req.userEmail, req.userIsAdmin)
    User.getAll((err, data) => {
        if (err)
          res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.json(data);
      }) 
}
exports.create = async (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password_hash: await bcryptjs.hash(req.body.password, 8),
    is_admin:req.body.is_admin
  });

  User.create(newUser, (err, data) => {
    if (err)
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.json(data);
  });
};
exports.update = (req, res) => {
  if (!req.body) {
    res.status(400).json({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found user with id ${req.params.id}.`
          });
        } else {
          res.status(500).json({
            message: "Error updating user with id " + req.params.id
          });
        }
      } else res.json(data);
    }
  );
};
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).json({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).json({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.json(data);
  });
};
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};