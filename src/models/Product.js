const sql = require("../db.js");

const Product = function(product) {
  if(typeof product.title !=='string' || !product.title ) throw ('Só é permitido string no campo de title');
  if(typeof product.description !=='string' || !product.description) throw ('Só é permitido string no campo de description');
  if(typeof product.price !=='number' || !product.price) throw ('Só é permitido string no campo price');
  this.title = product.title ;
  this.description = product.description;
  this.price = product.price;
};
Product.getAll = (result) => {
  let query = "SELECT * FROM products";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};
module.exports = Product