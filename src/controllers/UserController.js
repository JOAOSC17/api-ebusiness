const User = require("../models/User")
exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
          res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving users."
          });
        else res.json(data);
      }) 
}
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password_hash: req.body.password_hash,
    is_admin:req.body.is_admin
  });

  User.create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.json(data);
  });
};