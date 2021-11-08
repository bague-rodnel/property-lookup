import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import Property from "./pages/Property";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/properties/:id" element={<Property />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
