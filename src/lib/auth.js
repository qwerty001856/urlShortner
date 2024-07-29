const bcrypt = require("bcryptjs");
const User = require("@/models/User");

const authenticateUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }
  //TODO
  console.log("user", user);
  console.log("here 1");
  const isMatch = await bcrypt.compare(password, user.password);
  console.log("here 2");
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }
  return user;
};

module.exports = {
  authenticateUser,
};
