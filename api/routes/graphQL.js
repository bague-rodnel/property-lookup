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
      resolve: async (user) => {
        return await Property.find({ userId: user.id });
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
    rent: { type: new GraphQLNonNull(GraphQLInt) },
    userId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (property) => {
        return await User.findById(property.userId);
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
      args: {
        filter: { type: GraphQLString },
      },
      resolve: async (parent, { filter }) => {
        return await User.find({ firstName: filter });
      },
    },

    properties: {
      type: new GraphQLList(PropertyType),
      description: "List of All Properties",
      args: {
        filter: { type: GraphQLString },
      },
      resolve: async (parent, { filter }) => {
        return await Property.find({ street: filter });
      },
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
        return user;
      },
    },

    addProperty: {
      type: PropertyType,
      description: "Add a property",
      args: {
        street: { type: new GraphQLNonNull(GraphQLString) },
        city: { type: new GraphQLNonNull(GraphQLString) },
        state: { type: new GraphQLNonNull(GraphQLString) },
        zip: { type: new GraphQLNonNull(GraphQLString) },
        rent: { type: new GraphQLNonNull(GraphQLInt) },
        userId: { type: GraphQLString },
      },
      resolve: async (parent, args) => {
        let property = new Property({ ...args });
        await property.save();
        return property;
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
