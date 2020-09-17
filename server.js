const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./utils/cloudinary");
require("./db");
const passport = require("passport");
require("./config/passport")(passport);
const app = express();

const PORT = process.env.PORT || 5000;
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(cors());
const userRoutes = require("./routes/userRoute");
const courseRoutes = require("./routes/courseRoute");

//home route
app.get("/", (req, res) => {
  res.send("hello");
});

app.use(userRoutes);
app.use(courseRoutes);

//CORS settings
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.listen(PORT, () => {
  console.log("server started");
});
