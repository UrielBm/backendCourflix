const User = require("./../models/UserModel");
const bcrypt = require("bcrypt");
class UserService {
  getUsers(pag) {
    const query = User.find().skip(pag).limit(7).exec();
    return query;
  }
  getUserById(id) {
    const query = User.findOne({ _id: id }).exec();
    return query;
  }
  getUserByName(name) {
    const query = User.findOne({ name }).exec();
    return query;
  }
  insertUser(user) {
    bcrypt.hash(user.password, 10).then((hash) => {
      user.password = hash;
      const newUser = new User(user);
      return newUser.save();
    });
  }
  updateUser(id, data) {
    const query = User.findOneAndUpdate({ _id: id }, data);
    return query;
  }
  deleteUser(id) {
    const query = User.deleteOne({ _id: id }).exec();
    return query;
  }
}
module.exports = UserService;
