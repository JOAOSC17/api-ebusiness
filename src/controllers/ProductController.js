const Product = require("../models/Product")
exports.findAll = (req, res) => {
  Product.getAll((err, data) => {
        if (err)
          res.status(500).json({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        else res.json(data);
      }) 
}