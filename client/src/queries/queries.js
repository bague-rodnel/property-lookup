import { gql } from "@apollo/client";

const getUsersQuery = gql`
  query {
    users {
      id
      firstName
      lastName
      email
      phone
      properties {
        city
        state
        zip
      }
    }
  }
`;

const getPropertiesQuery = gql`
  query {
    properties {
      id
      street
      city
      state
      zip
      rent
      userId
    }
  }
`;

const addUserMutation = gql`
  mutation {
    addUser(firstName: "", lastName: "", email: "", phone: "") {
      id
      firstName
    }
  }
`;

const addProperty = gql`
  mutation {
    addProperty(street: "", city: "", state: "", zip: "", rent: 0, userId)
  }
`;

export { getUsersQuery, getPropertiesQuery };
