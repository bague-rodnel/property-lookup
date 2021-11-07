import { gql } from "@apollo/client";

const searchQuery = gql`
  query ($filters: FiltersInput) {
    search(filters: $filters) {
      properties {
        id
        street
        city
        state
        zip
        rent
        photo
        user {
          firstName
        }
      }
      users {
        id
        firstName
        lastName
        email
        avatar
        properties {
          id
          street
          city
          state
          zip
          rent
          photo
        }
      }
    }
  }
`;

const getPropertyQuery = gql`
  query ($id: String) {
    property(id: $id) {
      street
      city
      state
      zip
      rent
      photo
    }
  }
`;

export { searchQuery, getPropertyQuery };
