const express = require("express")
const UserRoutes = require("./routes/UserRoutes")
const LoginRoutes = require("./routes/LoginRoutes")
const connection  = require("./db")
const app = express()
require("dotenv").config

connection.connect(function (err) {
    if(err) throw err
    console.log("Conectado!")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", UserRoutes)
app.use("/login", LoginRoutes)
const PORT = process.env.PORT || 9001
app.listen(PORT, ()=>{
    console.log(`Backend is Running http://localhost:${PORT}/`);
})