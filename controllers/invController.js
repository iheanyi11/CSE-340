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
async function buildManagement(req, res, next) {
  let nav = await utilities.getNav()
  res.render("inventory/management", {
    title: "Vehicle Management",
    nav,
  })
}


// Build Error function
const throwError = (req, res, next) => {
  const error = new Error("This is a simulated 500 error.");
  error.status = 500;
  next(error);
};

module.exports = {
  throwError, buildManagement
};

module.exports = invCont 