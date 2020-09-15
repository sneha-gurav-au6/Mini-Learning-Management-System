const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require('../models/user')
const Course = require('../models/course')
const upload = require("../config/multer");
const { addCourse} =require('../controller/apiController/courseApiController')

//post user register
router.post("/user/addCourse", passport.authenticate("jwt", { session: false }), addCourse);




module.exports = router;