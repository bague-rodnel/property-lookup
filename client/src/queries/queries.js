import { gql } from "@apollo/client";

const searchQuery = gql`
  query {
    search {
      properties {
        street
        city
        state
        zip
        rent
        photo
      }
      users {
        firstName
        lastName
        email
      }
    }
  }
`;

export { searchQuery };
