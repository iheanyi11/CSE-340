const pool = require("../database"); // Database connection

// Add a new review
async function addReview(inv_id, account_id, rating, comment) {
    try {
        const sql = `
            INSERT INTO reviews (inv_id, account_id, rating, comment)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const result = await pool.query(sql, [inv_id, account_id, rating, comment]);
        return result.rows[0]; // Return the inserted review
    } catch (error) {
        console.error("Error adding review:", error);
        throw error;
    }
}

// Get reviews for an inventory item
async function getReviewsByInventory(inv_id) {
    try {
        const sql = `
            SELECT r.*, a.account_firstname, a.account_lastname 
            FROM reviews r
            JOIN account a ON r.account_id = a.account_id
            WHERE r.inv_id = $1
            ORDER BY r.created_at DESC;
        `;
        const result = await pool.query(sql, [inv_id]);
        return result.rows; // Return all reviews
    } catch (error) {
        console.error("Error retrieving reviews:", error);
        throw error;
    }
}

module.exports = { addReview, getReviewsByInventory };