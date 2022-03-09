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
