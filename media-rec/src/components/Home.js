import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import background from '.././images/background.png';
import transparentLogo from './../images/logo-transparent.png'

function Home({ handleLogin }) {
  return (
    // <div style={{ backgroundImage: `url(${background})`, height: '100%', backgroundSize: 'cover' }}>
    <div>
      <img src={background} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: '-1' }} />
      <div className="container" styles={{ display: 'flex', justifyContent: 'center' }}>

        <img src={transparentLogo} className="center mx-auto" style={{ maxWidth: '800px', display: 'block' }} />


        <h4 style={{ textAlign: 'center', color: '#fff' }}>
          To get started, please press either button to get recommendations for songs or movies
        </h4>
        <br></br>
      </div >
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
    </div>
  );
}

export default Home