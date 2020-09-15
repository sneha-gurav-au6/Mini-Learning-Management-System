const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/user");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret key";

//passpost js as middleware
module.exports = (passport) =>
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findById(jwt_payload.id)
        .then((user) => {
          if (user) {
            return done(null, jwt_payload);
          }
          return done(null, false);
        })
        .catch((err) => console.log(err));
    })
  );
