const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

//user model
const user = new Schema({
 

  //user from input register form
  
    email: {
      type: String,
    },
    password: {
      type: String,
    },


  name: {
    type: String,
  },
  user_type:{
type:String
  },
  image: {
    type: String,
  },
  city: {
    type: String,
  },
  phone_no: {
    type: Number,
  },
  about_me: {
    type: String,
  },
  country: {
    type: String,
  },
  company:{
      type:String,
  },
  school:{
    type:String,
},
hometown:{
    type:String,
},
languages:{
    type:String,
},
gender:{
    type:String,
},
  created_course: {
    type: [String],
  },
  registered_course : {
    type: [String],
  },
 
//   resetlink: {
//     type: String,
//     default: "",
//   },
//   token: {
//     type: String,
//     default: "",
//   },
});

//user login static method
user.statics.userFind = function (email, password) {
  var userObj = null;
  return new Promise(function (resolve, reject) {
    User.findOne({
      "email": email,
    })
      .then(function (user) {
        console.log(user);
        if (!user) {
          
          return reject("Incorrect Credintials");
        }
        userObj = user;
        return bcrypt.compare(password, user.password);
      })
      .then(function (isMatched) {
        if (!isMatched) return reject("Incorrect credentials as");
        console.log(isMatched)
        resolve(userObj);
        
      })
      .catch(function (err) {
        reject(err);
      });
  });
};
module.exports = User = mongoose.model("users", user);
