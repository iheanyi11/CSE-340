const utilities = require(".")
  const { body, validationResult } = require("express-validator")
  const validate = {}

  validate.classificationRules = () => {
    return [
      // valid email is required and cannot already exist in the DB
      body("classification_name")
      .trim()
      .escape()
      .notEmpty()
      .matches(/^[A-Za-z]+$/)
      .withMessage("Only alphabetic characters are allowed."),
      ]
    }

    /* ******************************
 * Check data and return errors or continue to login
 * ***************************** */
validate.checkClassificationData = async (req, res, next) => {
    const { classification_name } = req.body
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {
      let nav = await utilities.getNav()
      res.render("inventory/add-classification", {
        errors,
        title: "Add Classification",
        nav,
        classification_name,
      })
      return
    }
    next()
  }

  module.exports = validate