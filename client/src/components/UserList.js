import { useQuery, gql } from "@apollo/client";

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

const UserList = () => {
  const { loading, error, data } = useQuery(getUsersQuery);

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "there was an error fetching the data";
  }

  if (data.users.length < 0) {
    return null;
  }

  return (
    <ul className="search-results__users">
      {data.users.map((user) => (
        <li key={user.id}>{user.firstName}</li>
      ))}
    </ul>
  );
};

export default UserList;
