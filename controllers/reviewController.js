const ReviewModel = require("../models/reviewModel");
const utilities = require("../utilities/")


// Handle new review submission
async function submitReview(req, res) {
    const { inv_id, rating, comment } = req.body;
    const account_id = res.locals.accountData.account_id;

    // if (!account_id) {
    //     req.flash("error", "You must be logged in to submit a review.");
    //     return res.redirect(`/inv/detail/${inv_id}`);
    // }

    try {
        await ReviewModel.addReview(inv_id, account_id, rating, comment);
        req.flash("success", "Review submitted successfully!");
        return res.redirect(`/inv/detail/${inv_id}`);
    } catch (error) {
        req.flash("error", "Error submitting review. Please try again.");
    }

    res.redirect(`/inv/detail/${inv_id}`);
}

// Display reviews on inventory details page
async function showReviews(req, res) {
    const inv_id = req.params.inv_id;
    try {
        const reviews = await ReviewModel.getReviewsByInventory(inv_id);
        res.render("inventory/details", { reviews });
    } catch (error) {
        req.flash("error", "Error loading reviews.");
        res.redirect(`/inventory/details/${inv_id}`);
    }
}

async function renderReviewForm(req, res) {
    let nav = await utilities.getNav()
    const inv_id = req.params.inv_id;
    res.render("inventory/review", { 
        inv_id,
        nav,
        title: "Submit A Review",
        });
}

module.exports = { submitReview, showReviews, renderReviewForm };