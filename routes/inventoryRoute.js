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
router.get("/", utilities.accountType, utilities.handleErrors(invController.buildManagement))

//Route to build add classification view
router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView))

//Route to process adding classification
router.post(
    "/add-classification",
    regValidate.classificationRules(),
    regValidate.checkClassificationData,
    utilities.handleErrors(invController.addClassification)
  );

//Route to process adding new vehicle
router.post(
  "/add-inventory",
  regValidate.vehicleRules(),
  regValidate.checkVehicleData,
  utilities.handleErrors(invController.addInventory)
)
//Route to build add inventory view
router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView))

//Route to process view to get inventory data
router.get("/getInventory/:classification_id", utilities.handleErrors(invController.getInventoryJSON))

//Route to edit inventory view
router.get("/edit/:inv_id", utilities.handleErrors(invController.editInventoryView))

//Route to process updating inventory
router.post(
  "/update/", 
  regValidate.newInventoryRules(),
  regValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory))

//Route to delete inventory view
router.get("/delete/:inv_id", utilities.handleErrors(invController.deleteInventoryView))

//Route to process deleting inventory
router.post("/delete", utilities.handleErrors(invController.deleteInventoryItem))


// Broken route
router.get("/broken", utilities.handleErrors(invController.throwError));

module.exports = router;