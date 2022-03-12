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
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
    const { title, description, price } = req.body
    const newProduct = new Product({ 
      title, 
      description, 
      price 
    });

    Product.create(newProduct, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    else res.json(data);
  });
};