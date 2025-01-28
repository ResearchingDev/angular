// common/gSchema.js

const { GraphQLObjectType, GraphQLSchema, GraphQLInt, GraphQLString, GraphQLList } = require('graphql');
const manageClientModel = require('../models/manageClientModel'); 

// Define UserRoleType for GraphQL
const UserRoleType = new GraphQLObjectType({
  name: 'UserRole',
  fields: () => ({
    iUserRoleId: { type: GraphQLInt },
    vUserRole: { type: GraphQLString },
    eStatus: { type: GraphQLString }
  })
});

// Root Query for GraphQL
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    // Define the getUserRole query
    getUserRole: {
      type: new GraphQLList(UserRoleType), // Return a list of UserRoles
      resolve(parent, args) {
        return new Promise((resolve, reject) => {
          manageClientModel.getUserRole((err, result) => {
            if (err) reject(err);
            else resolve(result);
          });
        });
      }
    }
  }
});

// Dummy Mutation for GraphQL (to avoid the error)
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // You can leave it empty for now if you're not using mutations
    dummyMutation: {
      type: GraphQLString,  // Use a dummy type
      resolve() {
        return "Mutation not implemented";
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});