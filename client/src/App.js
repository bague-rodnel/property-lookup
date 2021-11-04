import { useQuery, gql } from "@apollo/client";
import { useState, useEffect } from "react";
import "./App.css";

const getUsersQuery = gql`
  query {
    users {
      id
      firstName
      lastName
      email
      phone
      properties {
        id
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

function App() {
  // const [apiResponse, setApiResponse] = useState("");
  const { loading, error, data } = useQuery(getPropertiesQuery);

  // const callAPI = () => {
  //   fetch("http://localhost:9000/graphql")
  //     .then((res) => res.text())
  //     .then((res) => {
  //       setApiResponse(res);
  //     });
  // };

  // useEffect(() => {
  //   callAPI();
  // }, []);

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "there was an error fetching the data";
  }

  console.log(data);

  return (
    <div className="App">
      <div className="search-results">
        <input type="text" />
        <ul className="search-results__data">
          {data.properties.map((property) => (
            <li key={property.id}>{property.street}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
