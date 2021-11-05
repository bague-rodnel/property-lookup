import { gql } from "@apollo/client";

const searchQuery = gql`
  query ($keyword: String = "", $zip: String = "") {
    search(keyword: $keyword, zip: $zip) {
      Properties {
        id
        street
        city
        state
        zip
        rent
        photo
        userId
        user {
          id
        }
      }
      Users {
        id
        firstName
        lastName
        email
        properties {
          id
        }
      }
    }
  }
`;

export { searchQuery };
