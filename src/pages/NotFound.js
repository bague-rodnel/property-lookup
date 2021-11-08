import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <p style={{ textAlign: "center" }}>
        ERROR 404: Resource not found. Go back to{" "}
        <Link to="/">the home page.</Link>
      </p>
    </div>
  );
};

export default NotFound;
