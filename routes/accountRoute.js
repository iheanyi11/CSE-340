//Needed Resources
const regValidate = require('../utilities/account-validation')
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")

//Route to view account
router.get("/login", utilities.handleErrors(accountController.buildLogin));
//Route to register view
router.get("/register", utilities.handleErrors(accountController.buildRegister));
//Route to process registration
router.post(
    "/register",
    regValidate.registationRules(),
    regValidate.checkRegData,
    utilities.handleErrors(accountController.registerAccount)
  )

module.exports = router;
