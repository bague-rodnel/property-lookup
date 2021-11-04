const User = require("../models/User");
const Property = require("../models/Property");
const expressGraphQL = require("express-graphql").graphqlHTTP;
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull,
} = require("graphql");

const { users, properties } = require("../data");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    phone: { type: new GraphQLNonNull(GraphQLString) },
    properties: {
      type: new GraphQLList(PropertyType),
      resolve: (user) => {
        return properties.filter((property) => property.userId === user.id);
      },
    },
  }),
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  description: "This represents a property",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    street: { type: new GraphQLNonNull(GraphQLString) },
    city: { type: new GraphQLNonNull(GraphQLString) },
    state: { type: new GraphQLNonNull(GraphQLString) },
    zip: { type: new GraphQLNonNull(GraphQLString) },
    rent: { type: new GraphQLNonNull(GraphQLString) },
    userId: {
      type: UserType,
      resolve: (property) => {
        return users.find((user) => user.id === property.id);
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      description: "List of All Users",
      resolve: () => users,
    },

    properties: {
      type: new GraphQLList(PropertyType),
      description: "List of All Properties",
      resolve: () => properties,
    },
  }),
});

const RootMutationType = new GraphQLObjectType({
  name: "Mutation",
  description: "Root Mutation",
  fields: () => ({
    addUser: {
      type: UserType,
      description: "Add a user",
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        phone: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: async (parent, args) => {
        let user = new User({ ...args });
        await user.save();
        // return user;
      },
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  mutation: RootMutationType,
});

const graphql = graphqlHTTP({
  schema: schema,
  graphiql: true,
});

module.exports = graphql;
