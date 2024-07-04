const express = require("express")
const router = express.Router()
const {handleAdmin} = require("../Controllers/AdminController")

router.get("/",handleAdmin)

module.exports = router