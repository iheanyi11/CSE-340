// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController") 
const utilities = require("../utilities/index")
const regValidate = require('../utilities/classification-validation')

// Route to build inventory by classification view
router.get("/type/:classificationId", utilities.handleErrors(invController.buildByClassificationId));
router.get("/detail/:inventoryId", utilities.handleErrors(invController.buildByInventoryId));

//Route to build Manangement view
router.get("/", utilities.handleErrors(invController.buildManagement))

//Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView))

//Route to process adding classification
router.post(
    "/add-classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
  );

//Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView))


// Broken route
router.get("/broken", utilities.handleErrors(invController.throwError));

module.exports = router;