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
  buildSchema,
} = require("graphql");

// const { users, properties } = require("../data");

const UserType = new GraphQLObjectType({
  name: "User",
  description: "This represents a user",
  fields: () => ({
    id: { type: new GraphQLNonNull(GraphQLString) },
    firstName: { type: new GraphQLNonNull(GraphQLString) },
    lastName: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
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
    photo: { type: new GraphQLNonNull(GraphQLString) },
    userId: { type: GraphQLString },
    user: {
      type: UserType,
      resolve: async (property) => {
        return await User.findById(property.userId);
      },
    },
  }),
});

const SearchType = new GraphQLObjectType({
  name: "Search",
  description: "Search type",
  fields: () => ({
    users: {
      type: new GraphQLList(UserType),
      resolve: ({ keyword }) => {
        let ret = [];

        ret.push(keyword);
        return ret;
      },
    },

    properties: {
      type: new GraphQLList(PropertyType),
      resolve: ({ keyword }) => {
        return [];
      },
    },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root query",
  fields: () => ({
    search: {
      type: SearchType,
      description: "Search query",
      args: {
        keyword: { type: GraphQLString },
      },
      resolve: (parent, { keyword }) => ({
        keyword,
        // users: {
        //   type: new GraphQLList(UserType),
        //   description: "List of All Users",
        //   resolve: async () => {
        //     // if (!keyword) {
        //     //   return [];
        //     // }
        //     console.log(keyword);
        //     if (keyword) {
        //       return await User.find({});
        //     }
        //     // if (!keyword) {
        //     //   return await User.find({});
        //     // }
        //     return await User.find({
        //       $or: [{ firstName: keyword }, { lastName: keyword }],
        //     });
        //   },
        // },
        // properties: {
        //   type: new GraphQLList(PropertyType),
        //   description: "List of All Properties",
        //   resolve: async () => {
        //     // if (!keyword || keyword.length < 2) {
        //     //   return [];
        //     // }
        //     console.log(keyword);
        //     if (keyword) {
        //       return await Property.find({});
        //     }
        //     if (!keyword) {
        //       return await Property.find({});
        //     }
        //     if (keyword.length < 2) {
        //       return [];
        //     }
        //     return await Property.find({
        //       $or: [
        //         { street: { $regex: keyword, $options: "i" } },
        //         { city: keyword },
        //         { state: { $regex: keyword } },
        //       ],
        //     });
        //     //
        //   },
        // },
      }),
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
});

const graphql = graphqlHTTP({
  schema: schema,
  graphiql: true,
});

module.exports = graphql;
