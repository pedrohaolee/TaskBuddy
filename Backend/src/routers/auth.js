const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  register,
  login,
  refresh,
  seedUsers,
} = require("../controllers/auth");
const {
  validateRegistrationData,
  validateLoginData,
  validateRefreshToken,
} = require("../validators/auth");
const checkErrors = require("../validators/checkErrors");
const { authAdmin } = require("../middleware/auth");

// router.get("/users", authAdmin, getAllUsers);
router.get("/users", getAllUsers);
router.put("/register", validateRegistrationData, checkErrors, register);
router.post("/login", validateLoginData, checkErrors, login);
router.post("/refresh", validateRefreshToken, checkErrors, refresh);
router.get("/seedusers", seedUsers);

module.exports = router;
