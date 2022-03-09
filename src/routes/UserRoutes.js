const route = require("express").Router()
const UserController = require("../controllers/UserController")
route.get("/", UserController.findAll)
module.exports=route