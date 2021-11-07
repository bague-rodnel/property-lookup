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

export { searchQuery };
