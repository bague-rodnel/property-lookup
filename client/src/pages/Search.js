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
  const { loading, error, data } = useQuery(searchQuery, {
    variables: { keyword },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // the requirement mentioned doing the search at the click of the button not on change of the input value
    setKeyword(inputVal);
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
            onPlaceSelected={(place) => {
              console.log(place);
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
                <PropertyList id="properties" data={data.properties} />
                <UserList id="users" data={data.users} />
              </Tabs>
            </>
          )}
        </div>
      </Container>
    </SearchStyled>
  );
};

export default Search;
