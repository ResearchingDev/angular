const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

//Get all client details
exports.getClient = (callback) => {
    db.query('SELECT fname,lname,email FROM pos_users', (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results);
    });
};

//Add new client
exports.addClientTableData = (addClientData, callback) => {
    const { fname, lname, password, username, email, userrole, address} = addClientData;
    const query = `INSERT INTO public."pos_users" ("fname", "lname", "password", "username","email","userrole","address","status", "created_by") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
    const values = [fname, lname, password, username, email, userrole, address,'0',"admin"];
    db.query(query, values, (err, results) => {
        if (err) {
            return callback(err);
        }
        callback(null, results.rows); // `results.rows` contains the inserted data
    });
}