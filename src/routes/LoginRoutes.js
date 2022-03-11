const route = require("express").Router()
const LoginController = require("../controllers/LoginController")
route.post("/", LoginController)
module.exports=route