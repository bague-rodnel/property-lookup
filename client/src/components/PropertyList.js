import { Card, Button, Container, Row, Col, Img } from "react-bootstrap";
import { IoMdPin } from "react-icons/io";

import { PropertyListStyled } from "./styles/PropertyList.styled";

const PropertyList = ({ data }) => {
  return (
    <PropertyListStyled className="property-list">
      <Container>
        <Row>
          {data.map((property) => {
            const { id, street, city, state, zip, rent, photo } = property;
            return (
              <Col
                xs={12}
                md={6}
                lg={4}
                xl={3}
                key={id}
                style={{ marginBottom: "2rem" }}
              >
                <Card>
                  <Card.Img className="property-image" src={photo} />
                  <Card.Body>
                    <Card.Text className="price">
                      ${rent.toLocaleString("en-US")}
                    </Card.Text>
                    <div
                      className="address"
                      title={`${street}, ${city}, ${state}, ${zip}`}
                    >
                      <IoMdPin className="address-pin" />
                      {`${street}, ${city}, ${state}, ${zip}`}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </PropertyListStyled>
  );
};

export default PropertyList;
