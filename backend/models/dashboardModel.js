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
            EXTRACT(MONTH FROM pu."created_at") AS month,
            pr."vUserRole" AS role,
            COUNT(*) AS count
        FROM public.pos_users AS pu
        JOIN public.pos_user_role AS pr ON CAST(pr."iUserRoleId" AS VARCHAR) = pu."userrole"
        WHERE EXTRACT(YEAR FROM pu."created_at") = $1::integer
        AND pu.status = '0'
        GROUP BY EXTRACT(MONTH FROM pu."created_at"), pr."vUserRole"
        ORDER BY month`,
        [year], // Pass the year as an integer here
        (err, results) => {
            if (err) {
                return callback(err, null);
            }
            let roleData = {};
            console
            results.rows.forEach(row => {
                const month = parseInt(row.month) - 1; // Convert month to 0-based index
                const role = row.role;
                const count = parseInt(row.count) || 0;
                // Initialize role arrays dynamically if not already present
                if (!roleData[role]) {
                    roleData[role] = Array(12).fill(0); // Create an array for the role with 12 months
                }
                // Assign the count value for the specific month
                roleData[role][month] = count;
            });

            let formattedData = Object.keys(roleData).map(role => ({
                name: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize the first letter of the role
                data: roleData[role]
            }));
            callback(null, formattedData);
        }
    );
};
