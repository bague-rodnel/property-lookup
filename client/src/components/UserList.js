import { useQuery } from "@apollo/client";
import { getUsersQuery } from "../queries/queries";

const UserList = ({ users }) => {
  // const { loading, error, data } = useQuery(getUsersQuery, {
  //   variables: { filter },
  // });

  // if (loading) {
  //   return "...loading";
  // }
  // if (error) {
  //   return "there was an error fetching the data";
  // }

  // if (data.users.length < 0) {
  //   return null;
  // }

  return (
    <ul className="search-results__users">
      {users.map((user) => (
        <li key={user.id}>{user.firstName}</li>
      ))}
    </ul>
  );
};

export default UserList;
