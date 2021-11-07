import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { UserListStyled } from "./styles/UserList.styled";

const UserList = ({ data }) => {
  return (
    <UserListStyled className="search-results__users">
      <Container>
        <Row>
          {data.map((user) => {
            const { id, firstName, lastName, avatar, properties } = user;
            return (
              <Col
                xs={12}
                md={4}
                lg={3}
                xl={2}
                key={id}
                style={{ marginBottom: "2rem" }}
              >
                <Card>
                  <Card.Img variant="top" src={avatar} />
                  <Card.Body>
                    <Card.Text>{firstName + " " + lastName}</Card.Text>
                    <Card.Text>
                      <a>View all {properties.length} properties</a>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </UserListStyled>
  );
};

export default UserList;
