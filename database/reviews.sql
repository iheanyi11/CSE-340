e following SQL command to create the reviews table:

sql
Copy
Edit
CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    inv_id INT NOT NULL,
    account_id INT NOT NULL,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (inv_id) REFERENCES inventory(inv_id) ON DELETE CASCADE,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);

