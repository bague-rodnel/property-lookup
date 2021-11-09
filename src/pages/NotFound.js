import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <p style={{ textAlign: "center", paddingTop: "5rem" }}>
        ERROR 404: Oops! That page doesn't exist. Check how easy it is to{" "}
        <Link to="/">find a home.</Link>
      </p>
    </div>
  );
};

export default NotFound;
