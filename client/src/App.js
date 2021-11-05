import { useQuery } from "@apollo/client";
import { useState, useEffect, useRef } from "react";

import "./App.css";
import Menu from "./components/Menu";
import PropertyList from "./components/PropertyList";
import Tabs from "./components/Tabs";
import UserList from "./components/UserList";
import { searchQuery } from "./queries/queries";

function App() {
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

  if (data) {
    console.log(data);
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <input type="submit" value="Search" />
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
    </div>
  );
}

export default App;
