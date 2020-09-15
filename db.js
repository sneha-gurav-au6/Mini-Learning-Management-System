//mongodb connection

const mongoose = require("mongoose");


mongoose
  .connect(process.env.MONGOOSE_URI , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(function () {
    console.log("Mongo db compass connected");
  })
  .catch(function (err) {
    console.log(err.message);
  })