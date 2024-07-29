const jwt = require("jsonwebtoken");

const createAccessToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30d",
  });
};

const createRefreshToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "60d",
  });
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
};

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
