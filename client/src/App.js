import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
