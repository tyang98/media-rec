import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function Home({ handleLogin }) {
  return (
    <Container className="mt-5 mx-auto">
      <h1>Welcome to mediaRec</h1>
      <h2>Press either button to get movie or song recommendations</h2>
      <br></br>
      <Row>
        <Col>
          <Button onClick={handleLogin}> Songs </Button>
        </Col>
        <Col>
          <NavLink to="/moviesrec">
            <Button>Movies</Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
}

export default Home