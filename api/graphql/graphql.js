const { gql } = require("apollo-server-express");

const User = require("../models/User");
const Property = require("../models/Property");
const mongoose = require("mongoose");

// const { users, properties } = require("../data");

let typeDefs = gql`
  type UserType {
    id: String
    firstName: String
    lastName: String
    email: String
    avatar: String
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

  input FiltersInput {
    name: String
    city: String
    state: String
    zip: String
  }

  type Query {
    search(filters: FiltersInput): SearchType
    property(id: String): PropertyType
  }
`;

let resolvers = {
  Query: {
    search: async (root, { filters }) => {
      let result = { users: [], properties: [] };

      const { zip, city, state, name } = filters;
      console.log(filters);

      if (zip) {
        result.properties =
          (await Property.find({ zip: zip }).populate("user")) || [];
      } else if (city && state) {
        result.properties =
          (await Property.find({
            city,
            state,
          }).populate("user")) || [];
      } else if (state) {
        result.properties =
          (await Property.find({
            state,
          })) || [];
      } else if (name) {
        const keyword = sanitizeName(name);

        console.log("'" + keyword + "'");
        if (keyword.length < 2) {
          return { users: [], properties: [] };
        }

        const regex = new RegExp("^" + keyword + "$", "i");
        console.log(regex);
        result.users =
          (await User.find({
            $or: [
              { firstName: { $regex: regex } },
              { lastName: { $regex: regex } },
            ],
          })) || [];

        result.properties =
          (await Property.find({
            street: { $regex: keyword, $options: "i" },
          }).populate("user")) || [];
      } else {
        // unknown
      }

      return result;
    },

    property: async (root, { id }) => {
      return await Property.findById(id);
    },
  },
  UserType: {
    properties: async (user) => {
      return (await Property.find({ user: user.id })) || [];
    },
  },
};

function sanitizeName(name) {
  const keyword = name
    .split(",")[0] // first chunk before comma
    .replace(/[^\w ]/g, "") // remove non alpha numeric, keep spaces
    .trim() // remove leading and trailing spaces
    .replace(/  +/g, " ") // reduce spaces to one
    .replace(/(\d)\s+(?=\d)/g, `$1`) // remove spaces between numbers
    .replace(/^0+/, "") // remove leading zeroes
    .replace(/_/g, ""); // remove underscores

  //.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape

  return keyword;
}

module.exports = { typeDefs, resolvers };
