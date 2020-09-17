const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");


//pages import
const Course = require("../../models/course");
const User = require("../../models/user");

const validateRegisterData = require("../../config/validation/registerValidator");
const validateLoginData = require("../../config/validation/loginValidator");

module.exports = {
  //user register route from input form
  registerUser: async (req, res) => {
    const { errors, isValid } = validateRegisterData(req.body);

    //checking for validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    console.log(req.body);

    //checking if user already existed or not
    const user = await User.findOne({ "email": req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ message: "Email Already Exists, Please Login" });
    } else {
      const newUser = new User({
        
        name: req.body.name,
        user_type:req.body.user_type,
        phone_no: null,
        city: "",
        country: "",
        about_me:"",
        company: "",
        hometown: "",
        languages: "",
        gender: "",
        
        image: "https://www.gravatar.com/avatar/anything?s=200&d=mm",
        
          email: req.body.email,
          password: req.body.password,
        
      });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.json({
                message: "Registered successfully. You can log in now",
                user: user,
                status: 201,
              })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  },

  //login user
  loginUser: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //checking for email and password match
    User.userFind(email, password)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: "Invalid Creadintials in login" });
        }
        const payload = {
          id: user.id,
          user_type:user.user_type,
          method: user.method,
          name: user.name,
          email: user.email,
          image: user.image,
          city: user.city,
          phone_no: user.phone_no,
          country:user.country,
          about_me: user.about_me,
          company: user.company,
          hometown: user.school,
          languages: user.languages,
          gender: user.gender,
        };
        jwt.sign(
          payload,
          "secret key",
          { expiresIn: 60 * 60 * 30 },
          (err, token) => {
            res.json({
              message: "Logged in Successfully",
              token: token,
            });
          }
        );
      })

      //if email or password not matches throw error
      .catch((err) => {
        res.status(401).json({ message: "Incorrect Credentials in login" });
      });
  },

 

  //edit user profile -protected route
  editprofile: async (req, res) => {
    // Get fields
    const userField = {};
    if (req.body.name) userField.name = req.body.name;
    if (req.body.city) userField.city = req.body.city;
    if (req.body.phone_no) userField.phone_no = req.body.phone_no;
    if (req.body.country) userField.country = req.body.country;

    if (req.body.about_me) userField.about_me = req.body.about_me;
    if (req.body.comapny) userField.comapny = req.body.comapny;
    if (req.body.school) userField.school = req.body.school;
    if (req.body.hometown) userField.hometown= req.body.hometown;
    if (req.body.languages) userField.languages= req.body.languages;
    if (req.body.gender) userField.gender= req.body.gender;


    if (req.file) {
      console.log(req.file.path);
      let wait = await cloudinary.uploader.upload(req.file.path, function (
        response,
        error
      ) {
        if (response) {
          console.log(response);
        }
        if (error) {
          console.log(error);
        }
      });
      userField.image = wait.url;
    }
    //finding and updating user
    User.findByIdAndUpdate(
      { _id: req.user.id },
      { $set: userField },
      { new: true }
    ).then((user) => {
      // JWT payload
      const jwtPayload = {
        id: user.id,
        method: user.method,
        name: user.name,
        email: user.google.email,
        image: user.image,
        city: user.city,
        phone_no: user.phone_no,
        country:user.country,
        about_me: user.about_me,
        company: user.company,
        hometown: user.school,
        languages: user.languages,
        gender: user.gender,
      };
      //Sign Token
      jwt.sign(
        jwtPayload,
        "secret key",
        { expiresIn: 3000000 },
        (err, token) => {
          res.json({
            success: true,
            token: token,
          });
        }
      );
    });
  },
  addRegisteredCourse: async (req, res) => {
    const userId = req.user.id;
    const CourseId = req.params.CourseId;

    console.log(CourseId);
    try {
      const data = await User.findById(userId);

      //if alredy added product
      if (data.registered_course.includes(CourseId)) {
        res.send("alredy added");
      } else {
        await User.findByIdAndUpdate(
          { _id: userId },
          { $push: { registered_course: CourseId} },

          { new: true }
        ).then(function (data) {
          res.status(201).json({
            message: "Course is registered",
            data: data,
          });
        });
      }
    } catch {
      res.status(404).send("user not found");
    }
  }





}
