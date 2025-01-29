const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql');
const db = require('../config/db.config');

// Define Data Type for Dashboard Data
const DashboardDataType = new GraphQLObjectType({
  name: 'DashboardData',
  fields: () => ({
    name: { type: GraphQLString },
    data: { type: new GraphQLList(GraphQLInt) },
  }),
});

// Root Query for fetching dashboard data
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getDashboardClientData: {
      type: new GraphQLList(DashboardDataType), // Returns an array of {name, data}
      args: {
        year: { type: GraphQLInt }, // Year as an argument
      },
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
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
              ORDER BY month;`,
            [args.year],
            (err, results) => {
              if (err) {
                reject(err);
              } else {
                let roleData = {};
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
                resolve(formattedData);
              }
            }
          );
        });
      },
    },
  },
});

// Export GraphQL Schema
module.exports = new GraphQLSchema({
  query: RootQuery,
});
