const express = require("express")
const connection  = require("./db")
const app = express()
require("dotenv").config

connection.connect(function (err) {
    if(err) throw err
    console.log("Conectado!")
})
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const PORT = process.env.PORT || 9001
app.listen(PORT, ()=>{
    console.log(`Backend is Running http://localhost:${PORT}/`);
})