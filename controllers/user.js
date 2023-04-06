const {
  hashPassowrd,
  comparePasswords,
} = require("../helpers/passwordHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.signup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const hashedPassword = await hashPassowrd(password);
      await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
      return res.json({ message: "Signup success!" });
    } else {
      return res.status(403).json({ error: "User already exists" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
exports.signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    } else {
      const { firstname, lastname, _id } = user;
      const passwordMatch = await comparePasswords(password, user.password);
      if (passwordMatch) {
        jwt.sign(
          { email, firstname, lastname, id: _id },
          process.env.JWTSECRET,
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({
              id: user._id,
              email: user.email,
              firstname: user.firstname,
              lastname: user.lastname,
            });
          }
        );
      } else {
        return res.status(400).json({ error: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).send({ error: "Server error" });
  }
};
exports.profile = async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWTSECRET, {}, async (err, info) => {
    if (err) throw err;
    res.json(info);
  });
};
exports.updateProfile = async (req, res) => {};
exports.logout = async (req, res) => {
  res.cookie("token", "").json({ loggedout: true });
};
