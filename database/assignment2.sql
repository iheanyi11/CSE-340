-- Data to insert Tony Stark record
INSERT INTO account (
        account_firstname,
        account_lastname,
        account_email,
        account_password
    )
VALUES (
        'Tony',
        'Stark',
        'tony@starkent.com',
        'Iam1ronM@n'
    );
-- Data to change Tony Stark account type
UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;
-- Data to delete Tony Stark record from the database
DELETE FROM account
WHERE account_id = 1;
-- Data to update GM Hummer inventory description
UPDATE inventory
SET inv_description = REPLACE(
        inv_description,
        'small interiors',
        'a huge interior'
    )
WHERE inv_id = 10;
--Data to select inventory model, inventory make and classification tabel from both tables
SELECT inventory.inv_make,
    inventory.inv_model,
    classification.classification_name
FROM inventory
    INNER JOIN classification ON inventory.classification_id = classification.classification_id
WHERE classification.classification_id = 2;
--Data to update image and thumbnail records on inventory table
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');