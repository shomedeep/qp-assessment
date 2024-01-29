const express = require("express");
const controller = require("../controllers/user_serializer");

const router = express.Router();

// Retrieve all available grocery items for booking
router.get("/grocery-items-for-booking", controller.getAvailableItems);

// Create a new order by booking multiple grocery items
router.post("/orders", controller.bookItems);

module.exports = router;
