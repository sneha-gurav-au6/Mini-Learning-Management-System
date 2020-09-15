const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Product model
const CourseSchema = new Schema({
  //owner of product
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  course_name: {
    type: String,
  },
  course_dept: {
    type: String,
  },
  description: {
    type: String,
  },
  course_room: {
    type: String,
  },
  waitlist_capacity: {
    type: String,
  },
course_team: {
    type: String,
  },

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Course = mongoose.model("courses", CourseSchema);
