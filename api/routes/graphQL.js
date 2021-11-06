const { gql } = require("apollo-server-express");

const User = require("../models/User");
const Property = require("../models/Property");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

// const { users, properties } = require("../data");

let typeDefs = gql`
  type UserType {
    id: String
    firstName: String
    lastName: String
    email: String
    properties: [PropertyType]
  }

  type PropertyType {
    id: String
    street: String
    city: String
    state: String
    zip: String
    rent: Int
    photo: String
    user: UserType
  }

  type SearchType {
    users: [UserType]
    properties: [PropertyType]
  }

  type Query {
    search(keyword: String = "", zip: String = ""): SearchType
  }
`;

let resolvers = {
  Query: {
    search: async (root, { keyword, zip }) => {
      let result = { users: [], properties: [] };

      result.users = await User.find({});
      result.properties = await Property.find({}).populate("user");
      return result;

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
  },
  UserType: {
    properties: async (user) => {
      // console.log("testing user.id: " + user._id);
      console.log("typeof user.id: " + typeof user._id);
      return await Property.find({ user: user.id });
    },
  },
};

module.exports = { typeDefs, resolvers };
