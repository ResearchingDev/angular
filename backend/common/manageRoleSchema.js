const { GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const db = require('../config/db.config');
const { encryptId,decryptId } = require('../common/jwtUtils')

// Define UserRole Type
const UserRoleType = new GraphQLObjectType({
  name: 'UserRole',
  fields: () => ({
    iUserRoleId: { type: GraphQLString },
    vUserRole: { type: GraphQLString },
    eStatus: { type: GraphQLString },
  }),
});

// Root Query for fetching user role by ID
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      getUserRoleById: {
        type: UserRoleType,  // Return a single UserRole
        args: {
          iUserRoleId: { type: GraphQLString }  // The user role ID as a parameter
        },
        async resolve(parent, args) {
            const iUserRoleId = decryptId(args.iUserRoleId);
          return new Promise((resolve, reject) => {
            db.query('SELECT * FROM pos_user_role WHERE "iUserRoleId" = $1', [iUserRoleId], (err, result) => {
              if (err) {
                reject(err);  // Handle error
              } else {
                if (result.rows.length > 0) {
                  resolve(result.rows[0]);  // Return the first matching result
                } else {
                  reject('User Role not found');  // Handle if no user role is found
                }
              }
            });
          });
        }
      }
    }
  });

const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // Mutation to add a User Role
        addUserRole: {
            type: UserRoleType,
            args: {
            vUserRole: { type: GraphQLString },
            eStatus: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
            if (!context.user) {
                throw new Error('Unauthorized');  // If no user, throw error
            }
            // Proceed to insert the role into the database
            try {
                const result = await db.query(
                  'INSERT INTO pos_user_role ("vUserRole", "eStatus","created_by","created_at") VALUES ($1, $2, 1, NOW()) RETURNING *', // Use RETURNING to get the inserted row
                  [args.vUserRole, args.eStatus]
                );
                return result.rows[0];
              } catch (error) {
                throw new Error('Error inserting user role: ' + error.message);
              }
            },
        },
      
        // Mutation to update a User Role
        updateUserRole: {
            type: UserRoleType,
            args: {
            iUserRoleId: { type: GraphQLString },
            vUserRole: { type: GraphQLString },
            eStatus: { type: GraphQLString },
            },
            async resolve(parent, args, context) {
            if (!context.user) {
                throw new Error('Unauthorized');  // If no user, throw error
            }
            const iUserRoleId = decryptId(args.iUserRoleId);
            // Proceed to update the user role in the database
            return db.query(
                'UPDATE pos_user_role SET "vUserRole" = $1, "eStatus" = $2, "updated_at" = NOW() WHERE "iUserRoleId" = $3 RETURNING *',
                [args.vUserRole, args.eStatus, iUserRoleId]
            )
            .then(result => {
                if (result.rows.length > 0) {
                return result.rows[0];  // Return the updated row
                } else {
                throw new Error('User Role not found');  // Handle if no matching row is found
                }
            })
            .catch(error => {
                throw new Error('Error updating user role: ' + error.message);
            });
            },
        },
        // DELETE User Role Mutation
        deleteUserRole: {
            type: GraphQLString,  // Return a confirmation message
            args: {
            iUserRoleId: { type: GraphQLString }
            },
            async resolve(parent, args, context) {
            if (!context.user) throw new Error('Unauthorized');
            const iUserRoleId = decryptId(args.iUserRoleId);
            return db.query(
                'UPDATE pos_user_role SET "eStatus" = $1, "updated_at" = NOW() WHERE "iUserRoleId" = $2 RETURNING *',
                ["2", iUserRoleId]
            ).then(result => {
                if (result.rows.length > 0) return `User Role ID ${args.iUserRoleId} deleted successfully`;
                throw new Error('User Role not found');
            }).catch(error => { throw new Error('Error deleting user role: ' + error.message); });
            },
        },
        },
  });
// Create and export the schema
module.exports = new GraphQLSchema({
  query: RootQuery, 
  mutation: RootMutation,
});
