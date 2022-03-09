const route = require("express").Router()
const UserController = require("../controllers/UserController")
route.get("/", UserController.findAll)
route.get("/:id", UserController.findOne)
route.post("/", UserController.create)
route.put("/:id", UserController.update)
module.exports=route