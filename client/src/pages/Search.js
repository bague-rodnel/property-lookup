import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";
import { searchQuery } from "../queries/queries";
import { Container } from "react-bootstrap";
import PropertyList from "../components/PropertyList";
import UserList from "../components/UserList";
import Tabs from "../components/Tabs";
import { SearchStyled } from "../components/styles/Search.styled";
import Autocomplete from "react-google-autocomplete";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [inputVal, setInputVal] = useState("");
  // const { loading, error, data } = useQuery(searchQuery, {
  //   variables: { keyword },
  // });
  const { loading, error, data } = useQuery(searchQuery);

  if (!loading) {
    console.log(data);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // the requirement mentioned doing the search at the click of the button not on change of the input value
    setKeyword(inputVal);
  };

  const isValidUSZip = (zip) => {
    return /^\d{5}(-\d{4})?$/.test(zip);
  };

  return (
    <SearchStyled>
      <Container>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
          />
          <input type="submit" value="Search" />
          <Autocomplete
            apiKey={process.env.REACT_APP_MAPS_API_KEY}
            placeholder="Enter a location"
            onPlaceSelected={(place) => {
              console.log(place);
              if (place.name) {
                // try parse if zipcode
                if (isValidUSZip(place.name)) {
                  console.log("us zip code found");
                } else {
                  // handle as a keyword search on street
                  // or name of user
                }
              } else if (place.address_components) {
                const zip_component = place.address_components.find(
                  (component) => component.types.includes("postal_code")
                );

                const zip = zip_component && zip_component.short_name;

                if (zip) {
                  // at this point the city and state will also match the addresses in the mock as they are valid us addresses so we only match zip codes in query
                }

                console.log(zip);
              } else {
                // unknown input entry
              }
            }}
            options={{
              types: ["(regions)"],
              componentRestrictions: { country: "us" },
            }}
          />
        </form>
        <div className="search-results">
          {loading ? (
            <p>...loading</p>
          ) : (
            <>
              <Tabs>
                <PropertyList id="properties" data={data.search.properties} />
                <UserList id="users" data={data.search.users} />
              </Tabs>
            </>
          )}
        </div>
      </Container>
    </SearchStyled>
  );
};

export default Search;
