//Needed Resources
const regValidate = require('../utilities/account-validation')
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities/index")
const accountController = require("../controllers/accountController")
const jwt = require("jsonwebtoken")
require("dotenv").config()

//Route to login management view
router.get("/management", utilities.checkLogin, utilities.handleErrors(accountController.buildManagement))
//Route to login view account
router.get("/login", utilities.handleErrors(accountController.buildLogin));
// Process the login request
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLogData,
  utilities.handleErrors(accountController.accountLogin)
)
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
