import { useQuery } from "@apollo/client";
import { getPropertiesQuery } from "../queries/queries";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FiMapPin } from "react-icons/fi";

const PropertyList = ({ data }) => {
  return (
    <div className="search-results__properties">
      <Container>
        <Row>
          {data.map((property) => {
            const { id, street, city, state, zip, rent, photo, userId } =
              property;
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
                  <Card.Img variant="top" src={photo} />
                  <Card.Body>
                    <Card.Text>${rent.toLocaleString("en-US")}</Card.Text>
                    <div>
                      <FiMapPin className="address-pin" />
                      {`${street}, ${city}, ${state}, ${zip}`}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default PropertyList;
