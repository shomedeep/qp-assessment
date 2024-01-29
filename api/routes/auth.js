const express = require("express");
const controller = require("../controllers/auth_serializer");

const router = express.Router();

// Add a new admin user
router.post("/signup", controller.signUp);

// login user and generate auth token
router.post("/login", controller.login);

module.exports = router;
