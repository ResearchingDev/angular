const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

// Fetch all ls_users
exports.loginUser = (loginData, callback) => {
    const { email, password } = loginData;
    const query = `SELECT * FROM public."psoMaster" WHERE LOWER("vEmail") = LOWER('${email}')`;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        // Check if user exists
        if (results.length === 0) {
            return callback(null, null); // No user found
        }
        const user = results.rows[0];
        // Compare the provided password with the stored hashed password
        bcrypt.compare(password, user.vPassword, (err, isMatch) => {
            if (err) {
                return callback(err);
            }
            // If password doesn't match
            if (!isMatch) {
                return callback(null, null); // Invalid password
            }
            // Exclude the password and other sensitive info from the response
            const { vPassword, dCreatedAt, dUpdatedAt, ...responseData } = user;
            // If JWT token is needed
            const token = jwt.sign({ id: user.iMid, email: user.vEmail }, SECRET_KEY, { expiresIn: '1h' });
            // Return user data and token (optional)
            callback(null, { user: responseData, token });
        });
    });
};