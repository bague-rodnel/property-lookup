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

let schema = buildSchema(`
  type UserType {
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    properties: [PropertyType]
  }

  type PropertyType {
    id: String,
    street: String,
    city: String,
    state: String,
    zip: String,
    rent: Int,
    photo: String,
    userId: String,
    user: UserType
  }

  type SearchType {
    Users: [UserType],
    Properties: [PropertyType]
  }

  type Query {
    search(keyword: String, zip: String): SearchType
  }
`);

let root = {
  search: async ({ keyword, zip }) => {
    let result = { Users: [], Properties: [] };

    if (zip) {
      result.Properties = await Property.find({ zip: zip });
    }

    if (keyword) {
      result.Users = await User.find({
        $or: [{ firstName: keyword }, { lastName: keyword }],
      });

      result.Properties = await Property.find({
        street: { $regex: keyword, $options: "i" },
      });
    }
    return result;
  },

  properties: async (user) => {
    const found = await Property.find({ userId: user.id });
    console.log(found);
    return found;
  },

  user: async (property) => {
    console.log("invokered");
    return await User.findById(property.userId);
  },
};

const graphql = graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
});

module.exports = graphql;
