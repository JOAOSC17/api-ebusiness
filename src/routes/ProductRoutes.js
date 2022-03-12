const route = require("express").Router()
const ProductController = require("../controllers/ProductController")
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/loginRequired")
route.get("/", ProductController.findAll)
module.exports=route