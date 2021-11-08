import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";
import { getPropertyQuery } from "../queries/queries";
import { PropertyStyled } from "../components/styles/Property.styled";
import { TabsStyled } from "../components/styles/Tabs.styled";
import { GiPalmTree, GiHouse } from "react-icons/gi";
import { GoChecklist } from "react-icons/go";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import SpinningCircle from "../components/SpinningCircle";
import Map from "../components/Map";

import "react-tabs/style/react-tabs.css";

const Property = () => {
  const { id } = useParams();
  const { loading, data } = useQuery(getPropertyQuery, {
    variables: { id: id },
  });

  if (loading) {
    return <SpinningCircle />;
  }

  if (!data) {
    return <p>property not found</p>;
  }

  const { street, city, state, zip, rent, photo } = data.property || {};
  return (
    <PropertyStyled>
      <Container>
        <Row>
          <Col xs={12} lg={7}>
            <img src={photo} alt="" />
            <Row>
              <Col xs={4}>
                <img src={photo} alt="" />
              </Col>
              <Col xs={4}>
                <img src={photo} alt="" />
              </Col>
              <Col xs={4}>
                <img src={photo} alt="" />
              </Col>
            </Row>
          </Col>
          <Col xs={12} lg={5}>
            <div className="property-summary">
              <h1>
                {`${street},`}
                <br />
                {`${city}, ${state} ${zip}`}
              </h1>
            </div>

            <TabsStyled>
              <Tabs>
                <TabList className="tablist">
                  <Tab>
                    <h2 className="heading">Details</h2>
                  </Tab>
                  <Tab>
                    <h2 className="heading">Inclusions</h2>
                  </Tab>
                  <Tab>
                    <h2 className="heading">Pricing</h2>
                  </Tab>
                </TabList>
                <TabPanel className="details">
                  <Container fluid className="specifics">
                    <Row>
                      <Col className="label">Bed</Col>
                      <Col>1</Col>
                    </Row>
                    <Row>
                      <Col className="label">Bath</Col>
                      <Col>1</Col>
                    </Row>
                    <Row>
                      <Col className="label">Type</Col>
                      <Col>Apartment</Col>
                    </Row>
                    <Row>
                      <Col className="label">Floor Area</Col>
                      <Col>664 sqft</Col>
                    </Row>
                  </Container>
                  <h3 className="about-heading">About the place</h3>
                  <p className="about-description">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Debitis optio veritatis excepturi vero
                  </p>
                </TabPanel>
                <TabPanel className="inclusions">
                  <Container fluid>
                    <Row>
                      <Col xs={6} sm={4} lg={6}>
                        <h3 className="heading">
                          <GiHouse />
                          Indoor
                        </h3>
                        <ul>
                          <li>Kitchen</li>
                          <li>Furniture</li>
                          <li>Air-conditioned</li>
                        </ul>
                      </Col>
                      <Col xs={6} sm={4} lg={6}>
                        <h3 className="heading">
                          <GiPalmTree />
                          Outdoor
                        </h3>
                        <ul>
                          <li>Balcony</li>
                          <li>Parking</li>
                        </ul>
                      </Col>
                      <Col xs={6} sm={4} lg={6}>
                        <h3 className="heading">
                          <GoChecklist />
                          Amenities
                        </h3>
                        <ul>
                          <li>Pool</li>
                          <li>Gym</li>
                          <li>Playground</li>
                          <li>Reception</li>
                        </ul>
                      </Col>
                    </Row>
                  </Container>
                </TabPanel>

                <TabPanel className="pricing">
                  <Container fluid>
                    <h3 className="price">
                      $
                      {rent.toLocaleString("en-us", {
                        minimumFractionDigits: 2,
                      })}
                    </h3>
                    <p>rent per month</p>
                    <Row>
                      <Col>Lease term</Col>
                      <Col>12 months</Col>
                    </Row>
                    <Row>
                      <Col>Min. credit score</Col>
                      <Col>670</Col>
                    </Row>
                    <Row>
                      <Col>Required deposit</Col>
                      <Col>$3,600.00</Col>
                    </Row>

                    <Button>Apply Now</Button>
                  </Container>
                </TabPanel>
              </Tabs>
            </TabsStyled>
          </Col>
        </Row>
      </Container>

      <div className="map-container">
        <Map property={data.property} />
      </div>
    </PropertyStyled>
  );
};

export default Property;
