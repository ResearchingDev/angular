const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

// check the user login
exports.loginUser = (loginData, callback) => {
    const { email, password } = loginData;
    const query = `SELECT * FROM public."pos_admin" WHERE LOWER("vEmail") = LOWER('${email}')`;
    db.query(query, (err, results) => {
        if (err) {
            return callback(err);
        }
        // Check if user exists
        if (results.length === 0) {
            return callback(null, null); // No user found
        }
        const user = results.rows[0];
        const pass = password.trim();
        const user_pass = user.vPassword.trim();
        // Compare the provided password with the stored hashed password
        bcrypt.compare(pass, user_pass, (err, isMatch) => {
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

// Update the signin option
exports.clientSignup = (signinData, callback) => {
    const { email, password, username} = signinData;
    const saltRounds = 10; 
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.error('Error generating hash:', err);
            return;
        }
        const query = `INSERT INTO public."pos_admin" ("vUserName", "vEmail", "vPassword", "eStatus") VALUES ($1, $2, $3, $4)`;
        const values = [username, email, hash, '0'];
        db.query(query, values, (err, results) => {
            if (err) {
                console.error('Error executing query:', err);
                return;
            }
            callback(null, results.rows); // `results.rows` contains the inserted data
        });
    });
};