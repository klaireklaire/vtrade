const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

const generateToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "168h" });

const generateResetToken = (data) =>
  jwt.sign(data, SECRET_KEY, { expiresIn: "300s" });

const createResetToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };

  return generateResetToken(payload);
};

const createUserJwt = (user) => {
  const payload = {
    id: user.id,
  };

  return generateToken(payload);
};

const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (err) {
    return {};
  }
};

module.exports = {
  generateToken,
  createUserJwt,
  validateToken,
  generateResetToken,
  createResetToken,
};