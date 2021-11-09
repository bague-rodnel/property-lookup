import { useQuery } from "@apollo/client";
import { useState } from "react";
import { searchQuery } from "../queries/queries";
import { Container, Form, InputGroup, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import PropertyList from "../components/PropertyList";
import { SearchStyled } from "../components/styles/Search.styled";
import { usePlacesWidget } from "react-google-autocomplete";
import SpinningCircle from "../components/SpinningCircle";

const Search = () => {
  const [filters, setFilters] = useState({});
  const [prevInputText, setPrevInputText] = useState("");
  const { loading, data } = useQuery(searchQuery, {
    variables: { filters },
  });

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_MAPS_API_KEY,
    onPlaceSelected: (place) => handleSubmit(null, place),
    options: {
      types: ["address"],
      componentRestrictions: { country: "us" },
    },
  });

  const handleSubmit = (e, place) => {
    if (e) {
      e.preventDefault();
    }

    if (place) {
      console.log(place);
      setFilters(breakdownPlace(place));
    } else {
      if (prevInputText !== ref.current.value) {
        setFilters(breakdownPlace({ name: ref.current.value }));
      }
    }

    setPrevInputText(ref.current.value);
  };

  console.log(data);

  return (
    <SearchStyled>
      <Container>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <input
              ref={ref}
              className="searchBox"
              placeholder="Enter a place"
            />
            <Button type="submit">
              <BsSearch />
              <span className="d-none d-sm-inline">Search</span>
            </Button>
          </InputGroup>
        </Form>
        <div className="search-results">
          {loading ? (
            <SpinningCircle />
          ) : data.search &&
            (data.search.users.length > 0 ||
              data.search.properties.length > 0) ? (
            <>
              {data.search.properties.length > 0 && (
                <>
                  <Container className="best-match-header">
                    <img className="logo" src="images/home-vector.png" alt="" />
                    <h2>BEST MATCHES</h2>
                  </Container>
                  <PropertyList data={data.search.properties} />
                </>
              )}
              {data.search.users.map((user) => {
                const { id, firstName, lastName, avatar } = user;
                console.log("id: " + id);
                return (
                  <>
                    <Container key={id}>
                      <div className="user-card">
                        <img
                          className="avatar"
                          src={avatar}
                          alt={`${firstName}, ${lastName}`}
                        />
                        <div className="info">
                          <div className="header">
                            <h2 className="fullname">
                              {(firstName + " " + lastName).toUpperCase()}
                            </h2>
                            <a href="#" className="follow">
                              Follow
                            </a>
                          </div>
                          <p>Owned properties - {user.properties.length}</p>
                        </div>
                      </div>
                    </Container>
                    <PropertyList data={user.properties} />
                  </>
                );
              })}
            </>
          ) : (
            <>
              {prevInputText && (
                <p className="no-matches-msg">
                  No property matched your search. Try a different search.
                </p>
              )}
            </>
          )}
        </div>
      </Container>
    </SearchStyled>
  );
};
function isValidUSZip(zip_code) {
  return /^\d{5}(-\d{4})?$/.test(zip_code);
}

function isValidUSState(state_code) {
  return /^(([Aa][EeLlKkSsZzRr])|([Cc][AaOoTt])|([Dd][EeCc])|([Ff][MmLl])|([Gg][AaUu])|([Hh][Ii])|([Ii][DdLlNnAa])|([Kk][SsYy])|([Ll][Aa])|([Mm][EeHhDdAaIiNnSsOoTt])|([Nn][EeVvHhJjMmYyCcDd])|([Mm][Pp])|([Oo][HhKkRr])|([Pp][WwAaRr])|([Rr][Ii])|([Ss][CcDd])|([Tt][NnXx])|([Uu][Tt])|([Vv][TtIiAa])|([Ww][AaVvIiYy]))$/.test(
    state_code
  );
}

function breakdownPlace(place) {
  let breakdown = { name: "", city: "", state: "", zip: "" };

  console.log(place);
  if (place.name) {
    // try parse if zipcode
    if (isValidUSZip(place.name)) {
      breakdown.zip = place.name;
    } else if (isValidUSState(place.name)) {
      breakdown.state = place.name.toUpperCase();
    } else {
      breakdown.name = place.name;
      // handle as a keyword search on street
      // or name of user
    }
  } else if (place.address_components) {
    const zip_component = place.address_components.find((component) =>
      component.types.includes("postal_code")
    );
    const city_component = place.address_components.find((component) =>
      component.types.includes("locality")
    );
    const state_component = place.address_components.find((component) =>
      component.types.includes("administrative_area_level_1")
    );

    const zip = zip_component && zip_component.short_name;
    const city = city_component && city_component.short_name;
    const state = state_component && state_component.short_name;

    if (zip) {
      breakdown = { ...breakdown, zip };
    }

    if (city) {
      breakdown = { ...breakdown, city };
    }

    if (state) {
      breakdown = { ...breakdown, state };
    }
  } else {
    return null;
  }

  return breakdown;
}

export default Search;
