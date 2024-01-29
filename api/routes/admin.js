const express = require("express");
const controller = require("../controllers/admin_serializer");

const checkAuthMiddleware = require("../../middleware/check_auth");


const router = express.Router();

// Add a new grocery item
router.post("/grocery-items", checkAuthMiddleware.checkaAuth, controller.saveItem);

// Retrieve all grocery items
router.get("/grocery-items", checkAuthMiddleware.checkaAuth, controller.getAllItems);

// Retrieve details of a specific grocery item by ID
router.get("/grocery-items/:id", checkAuthMiddleware.checkaAuth, controller.getItem);

// Update details of an existing grocery item
router.put("/grocery-items/:id", checkAuthMiddleware.checkaAuth, controller.updateItem);

// Remove a grocery item
router.delete("/grocery-items/:id", checkAuthMiddleware.checkaAuth, controller.deleteItem);

module.exports = router;
