import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import background from './../images/background.png';

function Home({ handleLogin }) {
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Container
        className="mt-5 mx-auto">

        <div className="container" styles={{ display: 'flex', justifyContent: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>Welcome to: </h1> <br />
          <h1 style={{ textAlign: 'center', fontSize: '100px' }}>mediaRec</h1>

          <h4 style={{ textAlign: 'center', marginTop: '2%' }
          } > To get started, please press either button to get recommendations for songs or movies</h4>
          <br></br>
        </div>
        <Container className="mx-auto mt-4">
          <Row>
            <Col>
              <Button size="lg" className="col-md-12" onClick={handleLogin}> Songs </Button>
            </Col>
            <Col>
              <NavLink to="/moviesrec">
                <Button size="lg" className="col-md-12" >Movies</Button>
              </NavLink>
            </Col>
          </Row>
        </Container>
      </Container >
    </div>
  );
}

export default Home