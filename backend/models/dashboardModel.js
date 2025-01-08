const db = require('../config/db.config');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

// check the user login
exports.getDashboardClientData = (clientData, callback) => {
    const { year } = clientData;
    // Query to get counts for admin, supervisor, and employee by month
    db.query(
        `SELECT  
            EXTRACT(MONTH FROM created_at) AS month,
            COUNT(CASE WHEN userrole::integer = 1 THEN 1 END) AS admin,
            COUNT(CASE WHEN userrole::integer = 2 THEN 1 END) AS supervisor,
            COUNT(CASE WHEN userrole::integer = 3 THEN 1 END) AS employee
        FROM public.pos_users
        WHERE EXTRACT(YEAR FROM created_at) = $1::integer
        AND status = '0'
        GROUP BY EXTRACT(MONTH FROM created_at)
        ORDER BY month`,
        [year], // Pass the year as an integer here
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            // Initialize the result object for admin, supervisor, and employee
            let result = {
                admin: Array(12).fill(0),
                supervisor: Array(12).fill(0),
                employee: Array(12).fill(0)
            };
            // Loop through the results and populate the counts in the result object
            results.rows.forEach(row => {
                const month = row.month - 1; // months are 1-indexed, so subtract 1 to get zero-indexed
                result.admin[month] = row.admin || 0;
                result.supervisor[month] = row.supervisor || 0;
                result.employee[month] = row.employee || 0;
            });
            // Construct the final response with the required format
            const formattedData = [
                { name: 'Admin', data: result.admin },
                { name: 'Supervisor', data: result.supervisor },
                { name: 'Employee', data: result.employee }
            ];
            return callback(null, formattedData); // Send the formatted data as a response
        }
    );
};
