import { useQuery } from "@apollo/client";
import { getPropertiesQuery } from "../queries/queries";

const PropertyList = ({ properties }) => {
  // const { loading, error, data } = useQuery(getPropertiesQuery, {
  //   variables: { filter },
  // });

  // if (loading) {
  //   return "...loading";
  // }
  // if (error) {
  //   return "there was an error fetching the data";
  // }

  // if (data.properties.length < 0) {
  //   return null;
  // }

  return (
    <ul className="search-results__properties">
      {properties.map((property) => (
        <li key={property.id}>{property.street}</li>
      ))}
    </ul>
  );
};

export default PropertyList;
