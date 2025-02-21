// routes/feedbackRoute.js
const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

// Submit a review
router.post("/submit", reviewController.submitReview);

// Route to render the review form
router.get("/review/:inv_id", reviewController.renderReviewForm);


module.exports = router;