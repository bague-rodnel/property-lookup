import { useQuery, gql } from "@apollo/client";

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

const PropertyList = () => {
  const { loading, error, data } = useQuery(getPropertiesQuery);

  if (loading) {
    return "...loading";
  }
  if (error) {
    return "there was an error fetching the data";
  }

  if (data.properties.length < 0) {
    return null;
  }

  return (
    <ul className="search-results__properties">
      {data.properties.map((property) => (
        <li key={property.id}>{property.street}</li>
      ))}
    </ul>
  );
};

export default PropertyList;
