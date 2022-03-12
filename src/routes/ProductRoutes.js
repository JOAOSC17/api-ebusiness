const route = require("express").Router()
const ProductController = require("../controllers/ProductController")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/loginRequired")
route.get("/", ProductController.findAll)
route.get("/:id", ProductController.findOne)
route.post("/", ProductController.create)
module.exports=route