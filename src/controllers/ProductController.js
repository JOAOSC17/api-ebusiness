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
exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).json({
            message: `Not found Product with id ${req.params.id}.`
          });
        } else {
          res.status(500).json({
            message: "Error retrieving Product with id " + req.params.id
          });
        }
      } else res.json(data);
    });
  };
exports.update = (req, res) => {
    if (!req.body) {
      res.status(400).json({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
    console.log(req.params.id);
  
    Product.updateById(
      req.params.id,
      new Product(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).json({
              message: `Not found product with id ${req.params.id}.`
            });
          } else {
            res.status(500).json({
              message: "Error updating product with id " + req.params.id
            });
          }
        }
        return res.json(data);
      }
    );
  };