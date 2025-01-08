const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

//Get all client details
exports.getClient = (callback) => {
    db.query(`SELECT user_id,fname,lname,email,CASE 
                WHEN userrole::integer = '1' THEN 'admin'
                WHEN userrole::integer = '2' THEN 'supervisor'
                WHEN userrole::integer = '3' THEN 'employee'
            END AS role FROM pos_users`, (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results);
    });
};

//Add new client
exports.addClientData = (addClientData, callback) => {
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

//Get client details by Id
exports.getClientDetailById = (user_data , callback) => {
    const { user_id } = user_data;
    db.query(`SELECT user_id,fname,lname,password,username,email,userrole,address,status FROM pos_users where user_id = '${user_id}'`, (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results);
    });
};

//Edit new client
exports.editClientData = (addClientData, callback) => {
    const { update_id, fname, lname, password, username, email, userrole, address } = addClientData;
    const query = `
        UPDATE public.pos_users
        SET fname = $1, lname = $2, password = $3, username = $4, email = $5, userrole = $6, address = $7, updated_by = $8
        WHERE user_id = $9
    `;
    const values = [fname, lname, password, username, email, userrole, address, "admin", update_id];
    db.query(query, values, (err, results) => {
        if (err) {
            console.log(err);
            return callback(err);
        }
        callback(null, results.rows); // `results.rows` contains the inserted data
    });
}