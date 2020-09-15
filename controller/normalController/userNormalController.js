const express = require("express");
const User = require("../../models/user");
const Course = require("../../models/course");

//user get routes
module.exports = {
  //geting user profile
  getUserProfile: async (req, res) => {
    const userId = req.user.id;
    try {
      const user = await User.findById(userId);
      console.log(user);
      res.status(200).send(user);
    } catch {
      res.status(501).send("Internal server error");
    }
  },
  //getting user registered courss by its id
  myRegisteredCourse: async (req, res) => {
    const user = req.user.id;
    try {
      const userCourse = await User.findById(user);

      const favourite = userCourse.registered_course;
      const arr = [];
      for (i = 0; i < favourite.length; i++) {
        var courses = await Course.find({ _id: favourite[i] });
        arr.push(courses);
      }
      res.status(200).json(arr);
    } catch (error) {
      res.status(400).send("No registered courses found");
      console.log(error);
    }
  },

  //getting all listed course for particular user
  getMyCourse: async (req, res) => {
    const userId = req.user.id;
    try {
      const userCourse = await User.findById(userId);
      const myProduct = userCourse.created_course;

      const favourite = myProduct;
      const arr = [];
      for (i = 0; i < favourite.length; i++) {
        var courses = await Course.find({ _id: favourite[i] });
        arr.push(courses);
      }
      res.status(200).json(arr);
    } catch (error) {
      res.status(400).send("No Created Course.");
      console.log(error);
    }
  },
};