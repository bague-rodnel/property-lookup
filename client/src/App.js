import { useState, useEffect, useRef } from "react";

import "./App.css";
import PropertyList from "./components/PropertyList";
import UserList from "./components/UserList";

function App() {
  const [filter, setFilter] = useState("");
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    setFilter(inputRef.current.value);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input ref={inputRef} type="text" />
        <input type="submit" value="Search" />
      </form>
      <div className="search-results">
        <PropertyList filter={filter} />
        <UserList filter={filter} />
      </div>
    </div>
  );
}

export default App;
