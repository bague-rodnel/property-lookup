import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";

import "./App.css";
import Menu from "./components/Menu";
import PropertyList from "./components/PropertyList";
import UserList from "./components/UserList";
import { searchQuery } from "./queries/queries";

function App() {
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef(null);
  const { loading, error, data } = useQuery(searchQuery, {
    variables: { keyword },
  });

  const handleSearch = (e) => {
    e.preventDefault();

    setKeyword(inputRef.current.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input ref={inputRef} type="text" />
        <input type="submit" value="Search" />
      </form>
      <div className="search-results">
        {loading ? (
          <p>...loading</p>
        ) : (
          <>
            <Menu data={data} />
            <PropertyList properties={data.properties} />
            <UserList users={data.users} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
