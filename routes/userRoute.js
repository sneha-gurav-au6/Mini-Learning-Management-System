const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require('../models/user')
const upload = require("../config/multer");
const { registerUser,loginUser,editprofile,addRegisteredCourse} =require('../controller/apiController/userApiController')
const {getUserProfile,myRegisteredCourse,getMyCourse} =require('../controller/normalController/userNormalController')

//post user register
router.post("/user/register", registerUser);

//user login
router.post("/user/login", loginUser);


//edit profile post route
router.post(
    "/user/editprofile",
    passport.authenticate("jwt", { session: false }),
    upload.single("image"),
    editprofile
  );

  router.get(
    "/userMyProfile",
    passport.authenticate("jwt", { session: false }),
    getUserProfile
  );
  router.post(
    "/user/registeredCourse/:CourseId",
    passport.authenticate("jwt", { session: false }),
    addRegisteredCourse
  );



  router.get(
    "/myRegisteredCourse",
    passport.authenticate("jwt", { session: false }),
    myRegisteredCourse
  );

  router.get(
    "/getMyCourse",
    passport.authenticate("jwt", { session: false }),
    getMyCourse
  );



module.exports = router;
