const sql = require("../db.js");

const Product = function(product) {
  if(typeof product.title !=='string' || !product.title ) throw ('Só é permitido string no campo de title');
  if(typeof product.description !=='string' || !product.description) throw ('Só é permitido string no campo de description');
  if(typeof product.price !=='number' || !product.price) throw ('Só é permitido number no campo price');
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
Product.create = (newProduct, result) => {
    sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return      
      }
      console.log("created product: ", { id: res.insertId, ...newProduct });
      result(null, { id: res.insertId, ...newProduct });
    });
  };
Product.findById = (id, result) => {
  sql.query(`SELECT * FROM products WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};
Product.updateById = (id, product, result) => {
    sql.query(
      "UPDATE products SET title = ?, description = ?, price = ? WHERE id = ?",
      [product.title, product.description, product.price, id],
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
  
        console.log("updated product: ", { id: id, ...product });
        result(null, { id: id, ...product });
      }
    );
  };
Product.remove = (id, result) => {
    sql.query("DELETE FROM products WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found product with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted product with id: ", id);
      result(null, res);
    });
  };
module.exports = Product