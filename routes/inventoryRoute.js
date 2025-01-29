// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController") 
const utilities = require("../utilities/index")

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

// Broken route
router.get("/broken", utilities.handleErrors(invController.throwError));

module.exports = router;