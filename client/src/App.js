import { useState, useEffect } from "react";

import "./App.css";
import PropertyList from "./components/PropertyList";
import UserList from "./components/UserList";

function App() {
  const [filter, setFilter] = useState("");

  return (
    <div className="App">
      <form>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
      <div className="search-results">
        <UserList filter={filter} />
        <PropertyList filter={filter} />
      </div>
    </div>
  );
}

export default App;
