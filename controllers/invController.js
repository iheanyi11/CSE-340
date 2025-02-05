const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

invCont.buildByInventoryId = async function (req, res, next) {
  let nav = await utilities.getNav()
  const inventory_id = req.params.inventoryId
  const data = await invModel.getDetailByInventoryId(inventory_id)
  const listing = await utilities.buildDetailGrid(data[0])
  const itemName = `${data[0].inv_make} ${data[0].inv_model}`;
  res.render("inventory/listing", {
    title: itemName,
    nav,
    listing,
  })
}

/* ****************************************
*  Deliver management view
* *************************************** */
invCont.buildManagement = async function(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
    errors: null
  })
}

//Build add classification view
invCont.buildAddClassificationView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav,
    errors: null
  })
}

/* ********************************
* Process adding of new classification
* ********************************* */
invCont.addClassification = async function (req, res, next) {
  const { classification_name } = req.body;
  const result = await invModel.addClassification(classification_name);

  if (result) {
    req.flash("success", "Classification added successfully.");
    res.redirect("./inventory/management");
  } else {
    req.flash("error", "Failed to add classification.");
    res.redirect("./inventory/add-classification");
  }
};

//Build add Inventory view
invCont.buildAddInventoryView = async function (req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/add-inventory", {
    title: "Add New Vehicle",
    nav,
    errors: null
  })
}


// Build Error function
const throwError = (req, res, next) => {
  const error = new Error("This is a simulated 500 error.");
  error.status = 500;
  next(error);
};

module.exports = {
  throwError
};

module.exports = invCont 