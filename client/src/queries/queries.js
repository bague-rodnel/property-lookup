import { gql } from "@apollo/client";

const getUsersQuery = gql`
  query ($keyword: String = "") {
    users(keyword: $keyword) {
      id
      firstName
      lastName
      email
      properties {
        city
        state
        zip
      }
    }
  }
`;

const getPropertiesQuery = gql`
  query ($keyword: String = "'") {
    properties(keyword: $keyword) {
      id
      street
      city
      state
      zip
      rent
      photo
      userId
    }
  }
`;

const searchQuery = gql`
  query search($keyword: String = "") {
    properties(keyword: $keyword) {
      id
      street
      city
      state
      zip
      rent
      photo
      userId
    }
    users(keyword: $keyword) {
      id
      firstName
      lastName
      email
      properties {
        city
        state
        zip
      }
    }
  }
`;

const addUserMutation = gql`
  mutation ($firstName: String!, $lastName: String!, $email: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email) {
      id
      firstName
      lastName
      email
    }
  }
`;

const addPropertyMutation = gql`
  mutation (
    $street: String!
    $city: String!
    $state: String!
    $zip: String!
    $rent: Int!
    $userId: String!
  ) {
    addProperty(
      street: $street
      city: $city
      state: $state
      zip: $zip
      rent: $rent
      userId: $userId
    )
  }
`;

export {
  getUsersQuery,
  getPropertiesQuery,
  searchQuery,
  addUserMutation,
  addPropertyMutation,
};
