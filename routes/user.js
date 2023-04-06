const {
  signup,
  signin,
  profile,
  updateProfile,
  logout,
} = require("../controllers/user");
const {
  signupValidator,
  signinValidator,
} = require("../validators/userValidator");

const router = require("express").Router();

router.post("/signup", signupValidator, signup);
router.post("/signin", signinValidator, signin);
router.get("/profile", profile);
router.put("/updateProfile", updateProfile);
router.get("/logout", logout);

module.exports = router;
