

const fs = require("fs");
const path = require("path");

//pages import
const upload = require("../../config/passport");
const User = require("../../models/user");
const Course = require("../../models/course");

module.exports = {
  //adding new product only for registerd user
  addCourse: async (req, res) => {
    const capitalLetters = (s) => {
      return s
        .trim()
        .split(" ")
        .map((i) => i[0].toUpperCase() + i.substr(1))
        .reduce((ac, i) => `${ac} ${i}`);
    };
    const title1 = req.body.course_name;
    const mainTitle = capitalLetters(title1);


    const newProduct = {
      user: req.user.id,
      course_name: mainTitle,
      course_dept: req.body.course_dept,
      course_room: req.body.course_room,
      waitlist_capacity: req.body.waitlist_capacity,
      description: req.body.description,
      course_team: req.body.course_team,
     
    };

    //saving new product
    const saveCourse = (course) => {
      let newPro = new Course(course);
      newPro
        .save()
        .then((saveCourse) => {
          User.findByIdAndUpdate(
            { _id: saveCourse.user },
            { $push: { created_course: saveCourse._id } },
            { new: true }
          )
            .then((user) =>
              res.json({
                massage: "Created Succesfully",
                data: user,
              })
            )
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    };
    saveCourse(newProduct);
  },
  getCourse: (req, res) => {
    Course.find()
      .then(function (property) {
        console.log(property)
        res.send(property);
      })
      .catch(function (err) {
        console.log(err.message);
      });
  },

}

