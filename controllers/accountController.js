const utilities = require("../utilities/index")
const accountModel = require("../models/account-model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()


/* ****************************************
*  Deliver login view
* *************************************** */
async function buildLogin(req, res, next) {
    let nav = await utilities.getNav()
    res.render("account/login", {
      title: "Login",
      nav,
      errors:null,
    })
  }
  

/* ****************************************
*  Deliver registration view
* *************************************** */
async function buildRegister(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/register", {
    title: "Register",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Deliver login account management view
* *************************************** */
async function buildManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/management", {
    title: "Account Management",
    nav,
    errors: null 
  })
  
}


/* ****************************************
*  Process Registration
* *************************************** */
async function registerAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_password } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the registration.')
    res.status(500).render("account/register", {
      title: "Registration",
      nav,
      errors: null,
    })
  }

  const regResult = await accountModel.registerAccount(
    account_firstname,
    account_lastname,
    account_email,
    hashedPassword
  )

  if (regResult) {
    req.flash(
      "notice",
      `Congratulations, you\'re registered ${account_firstname}. Please log in.`
    )
    res.status(201).render("account/login", {
      title: "Login",
      nav,
    })
  } else {
    req.flash("notice", "Sorry, the registration failed.")
    res.status(501).render("account/register", {
      title: "Registration",
      nav,
      errors:null,
    })
  }
}


/* ****************************************
 *  Process login request
 * ************************************ */
async function accountLogin(req, res) {
  let nav = await utilities.getNav();
  const { account_email, account_password } = req.body;
  const accountData = await accountModel.getAccountByEmail(account_email);
  if (!accountData) {
    req.flash("notice", "Please check your credentials and try again.");
    res.status(400).render("account/login", {
      title: "Login",
      nav,
      errors: null,
      account_email,
    });
    return;
  }
  try {
    if (await bcrypt.compare(account_password, accountData.account_password)) {
      delete accountData.account_password;
      const accessToken = jwt.sign(
        accountData,
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 3600 * 1000 }
      );
      if (process.env.NODE_ENV === "development") {
        res.cookie("jwt", accessToken, { httpOnly: true, maxAge: 3600 * 1000 });
      } else {
        res.cookie("jwt", accessToken, {
          httpOnly: true,
          secure: true,
          maxAge: 3600 * 1000,
        });
      }
      return res.redirect("/account/management");
    } else {
      req.flash(
        "message notice",
        "Please check your credentials and try again."
      );
      res.status(400).render("account/login", {
        title: "Login",
        nav,
        errors: null,
        account_email,
      });
    }
  } catch (error) {
    console.log(error);
    throw new Error("Access Forbidden");
  }
}

/* ****************************************
*  Deliver the update account view
* *************************************** */
async function buildUpdateAccount(req, res, next) {
  let nav = await utilities.getNav()
  res.render("account/update", {
    title: "Edit Account",
    nav,
    errors: null,
  })
}

/* ****************************************
*  Update an account
* *************************************** */
async function updateAccount(req, res) {
  let nav = await utilities.getNav()
  const { account_firstname, account_lastname, account_email, account_id } = req.body
  console.log(account_id)
  const updResult = await accountModel.updateAccount(
    account_firstname,
    account_lastname,
    account_email,
    account_id
  )

  if (updResult) {
    req.flash("notice", "Congratulations, you updated the account!")
    // Create a new Cookie with updated data
    const accountToken = await accountModel.getAccountByEmail(account_email)
    delete accountToken.account_password
    const token = jwt.sign(accountToken, process.env.ACCESS_TOKEN_SECRET, {expiresIn: 3600 * 1000})
    if (process.env.NODE_ENV == "development"){
      res.cookie("jwt", token, {httpOnly: true, maxAge: 3600 * 1000})
    }else {
      res.cookie("jwt", token, {httpOnly:true, secure: true, maxAge: 3600 * 1000})
    }
    // Then render the page with the new Cookie
    res.render("account/management", {
      title: "Account Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the account update failed.")
    res.status(501).render("account/update", {
      title: "Edit Account",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Update an account password
* *************************************** */
async function updatePassword(req, res) {
  let nav = await utilities.getNav()
  const { account_password, account_id } = req.body

  // Hash the password before storing
  let hashedPassword
  try {
    // regular password and cost (salt is generated automatically)
    hashedPassword = await bcrypt.hashSync(account_password, 10)
  } catch (error) {
    req.flash("notice", 'Sorry, there was an error processing the password update.')
    res.status(500).render("account/update", {
      title: "Edit Account",
      nav,
      errors: null,
    })
  }

  const updResult = await accountModel.updatePassword(
    hashedPassword,
    account_id
  )

  if (updResult) {
    req.flash("notice", `Congratulations, you updated the password!`)
    res.status(201).render("account/management", {
      title: "Account Management",
      nav,
      errors: null,
    })
  } else {
    req.flash("notice", "Sorry, the password update failed.")
    res.status(501).render("account/update", {
      title: "Edit Account",
      nav,
      errors: null,
    })
  }
}

/* ****************************************
*  Logout Account and delete cookie
* *************************************** */
function logoutAccount(req, res){
  res.clearCookie("jwt");
  res.locals.loggedin = 0;
  return res.redirect("/");
}


  module.exports = { buildLogin, buildRegister, registerAccount, accountLogin, buildManagement, logoutAccount, updateAccount, updatePassword, buildUpdateAccount }

