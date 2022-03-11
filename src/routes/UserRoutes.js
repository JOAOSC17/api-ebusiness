const route = require("express").Router()
const UserController = require("../controllers/UserController")
const { verifyToken, verifyTokenAndAuthorization } = require("../middlewares/loginRequired")
route.get("/", UserController.findAll)
route.get("/:id",verifyTokenAndAuthorization, UserController.findOne)
route.post("/", UserController.create)
route.put("/:id", UserController.update)
route.delete("/:id", UserController.delete)
module.exports=route