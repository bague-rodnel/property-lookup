import { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [apiResponse, setApiResponse] = useState("");

  console.log(apiResponse);

  const callAPI = () => {
    fetch("http://localhost:9000/graphql")
      .then((res) => res.text())
      .then((res) => {
        setApiResponse(res);
      });
  };

  useEffect(() => {
    callAPI();
  }, []);

  return (
    <div className="App">
      <p className="App__intro">{apiResponse}</p>
    </div>
  );
}

export default App;
