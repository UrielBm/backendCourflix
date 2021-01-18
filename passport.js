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
        console.log(userData);
        if (!userData) {
          console.log(`usuario no existe`);
          cb(null, false);
        }
        const comparePassword = await bcrypt.compare(
          password,
          userData.password
        );
        if (!comparePassword) {
          console.log(`contraseña incorrecta`);
          return cb(null, false);
        }
        console.log(`todo ok`);
        // todo ok
        cb(null, userData);
      } catch (e) {
        //error
        console.log(e);
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
