const route = require("express").Router()
const ProductController = require("../controllers/ProductController")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/loginRequired")
route.get("/", ProductController.findAll)
route.get("/:id", ProductController.findOne)
route.post("/", verifyTokenAndAdmin, ProductController.create)
route.put("/:id", verifyTokenAndAdmin, ProductController.update)
route.delete("/:id", verifyTokenAndAdmin, ProductController.delete)
module.exports=route