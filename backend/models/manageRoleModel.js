const db = require('../config/db.config');
const { encryptId,decryptId } = require('../common/jwtUtils')

//Get all client details
exports.getUserRoleData = (req, callback) => {
    let { start, length, search, order, columns } = req.body;
    start = parseInt(start) || 0;
    length = parseInt(length) || 10;
    let orderColumn = columns[order[0].column].data;
    let orderDirection = order[0].dir.toUpperCase();
    const validColumns = ["vUserRole", "eStatus"];
    if (!validColumns.includes(orderColumn)) orderColumn = `"iUserRoleId"`; // Default sort column

    // Search filter
    let searchQuery = "";
    let queryParams = [];
    if (search && search.value) {
        searchQuery = `AND (vUserRole ILIKE $1 OR 
                        CASE 
                          WHEN eStatus::integer = '0' THEN 'Active'
                          WHEN eStatus::integer = '1' THEN 'InActive'
                        END ILIKE $1)`;
        queryParams.push(`%${search.value}%`);
    }

    // Query to get total records (before filtering)
    const totalRecordsQuery = `SELECT COUNT(*) AS total FROM pos_user_role WHERE "eStatus" != '2'`;

      // Query to get filtered records
    const filteredQuery = `
    SELECT "iUserRoleId","vUserRole", 
    CASE 
        WHEN "eStatus"::integer = '0' THEN 'Active'
        WHEN "eStatus"::integer = '1' THEN 'InActive'
    END AS eStatus 
    FROM public.pos_user_role 
    WHERE "eStatus" != '2' ${searchQuery}
    ORDER BY "${orderColumn}" ${orderDirection}
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
            iUserRoleId: encryptId(row.iUserRoleId),
        }));
        callback(null, { totalRecords, filteredRecords: results.rowCount, data: encryptResults });
        });
    });
};