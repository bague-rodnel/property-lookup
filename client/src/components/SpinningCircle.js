import { Spinner } from "react-bootstrap";
import { SpinningCircleStyled } from "./styles/SpinningCircle.styled";

const SpinningCircle = () => {
  return (
    <SpinningCircleStyled className="spinning-circle">
      <Spinner animation="border" size="lg" />;
    </SpinningCircleStyled>
  );
};

export default SpinningCircle;
