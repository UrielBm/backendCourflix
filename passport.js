const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const InstanceUser = require("./services/UserService");
const bcrypt = require("bcrypt");
const UserInstance = new InstanceUser();
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, cb) => {
      try {
        const userData = await UserInstance.getUserByemail(email);
        if (!userData) {
          cb(null, false);
        }
        const comparePassword = await bcrypt.compare(
          password,
          userData.password
        );
        if (!comparePassword) {
          return cb(null, false);
        }
        // todo ok
        cb(null, userData);
      } catch (e) {
        //error
        cb(null, false);
      }
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.email);
});

passport.deserializeUser(async (email, cb) => {
  const data = await UserInstance.getUserByemail(email);
  cb(null, data);
});
