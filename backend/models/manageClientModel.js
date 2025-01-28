const db = require('../config/db.config');
const { encryptId,decryptId } = require('../common/jwtUtils')

//Get all client details
exports.getClient = (req, callback) => {
    let { start, length, search, order, columns } = req.body;
    start = parseInt(start) || 0;
    length = parseInt(length) || 10;
    let orderColumn = columns[order[0].column].data;
    let orderDirection = order[0].dir.toUpperCase();

    const validColumns = ["fname", "lname", "email", "role"];
    if (!validColumns.includes(orderColumn)) orderColumn = "fname"; // Default sort column

    // Search filter
    let searchQuery = "";
    let queryParams = [];

    if (search && search.value) {
        searchQuery = `AND (fname ILIKE $1 OR lname ILIKE $1 OR email ILIKE $1 OR 
                        CASE 
                          WHEN userrole::integer = '1' THEN 'Admin'
                          WHEN userrole::integer = '2' THEN 'Admin'
                          WHEN userrole::integer = '3' THEN 'Employee'
                          WHEN userrole::integer = '4' THEN 'Supervisor'
                          WHEN userrole::integer = '5' THEN 'Tester'
                        END ILIKE $1)`;
        queryParams.push(`%${search.value}%`);
    }

    // Query to get total records (before filtering)
    const totalRecordsQuery = `SELECT COUNT(*) AS total FROM pos_users WHERE status = '0'`;

      // Query to get filtered records
    const filteredQuery = `
    SELECT user_id, fname, lname, email,
        CASE 
            WHEN userrole::integer = '1' THEN 'Admin'
            WHEN userrole::integer = '2' THEN 'Admin'
            WHEN userrole::integer = '3' THEN 'Employee'
            WHEN userrole::integer = '4' THEN 'Supervisor'
            WHEN userrole::integer = '5' THEN 'Tester'
        END AS role 
    FROM pos_users 
    WHERE status = '0' ${searchQuery}
    ORDER BY ${orderColumn} ${orderDirection}
    LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
    queryParams.push(length, start);

    // Execute queries
    db.query(totalRecordsQuery, [], (err, totalResult) => {
        if (err) return callback(err, null);
        
        const totalRecords = totalResult.rows[0].total;

        db.query(filteredQuery, queryParams, (err, results) => {
        if (err) return callback(err, null);
        // Encrypt User IDs before sending response
        const encryptResults = results.rows.map(row => ({
            ...row,
            user_id: encryptId(row.user_id),
        }));
        callback(null, { totalRecords, filteredRecords: results.rowCount, data: encryptResults });
        });
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
    const decrypted_user_id = decryptId(user_id);
    db.query(`SELECT user_id,fname,lname,password,username,email,userrole,address,status FROM pos_users where user_id = '${decrypted_user_id}'`, (err, results) => {
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
            return callback(err);
        }
        callback(null, results.rows); // `results.rows` contains the inserted data
    });
}

//Delete client
exports.deleteClient = (user_data , callback) => {
    const { id } = user_data;
    db.query(`UPDATE public.pos_users SET status = 1 WHERE user_id = '${id}'`, (err, results) => {
        if (err) return callback(err, null);
        return callback(null, results);
    });
};


//user role
//Get all user role details
exports.getUserRole = (callback) => {
    db.query(`SELECT * FROM pos_user_role where "eStatus" = '0'`, (err, results) => {
        if (err) return callback(err, null);
        if (!Array.isArray(results.rows)) {
            results = [results.rows];  // Wrap non-array results in an array (if necessary)
        }
        return callback(null, results.rows);
    });
};