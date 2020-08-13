import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import background from '.././images/background.png';
import transparentLogo from './../images/logo-transparent.png'
import card1 from './../images/card1.png'
import card2 from './../images/card2.png'
import card3 from './../images/card3.png'

function Home({ handleLogin }) {
  return (

    <div>
      <img src={background} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: '-1', filter: 'brightness(50%)' }} />
      <div className="container" styles={{ display: 'flex', justifyContent: 'center' }}>

        <img src={transparentLogo} className="center mx-auto" style={{ maxWidth: '750px', display: 'block', position: 'relative', top: '-60px' }} />
        <Row >
          <Col className='col-md-4' style={{ position: 'relative', left: '-150px' }}>
            <Card style={{ width: '450px', height: '350px', position: 'relative', top: '-100px' }}>
              <Card.Img variant='top' src={card1} />
              <Card.Title>Integrated with Spotify</Card.Title>
              <Card.Text>Search Your Favorite Songs for Recommendations</Card.Text>
            </Card>
          </Col>

          <Col className='col-md-4'>
            <Card style={{ width: '450px', height: '350px', position: 'relative', top: '-100px' }}>
              <Card.Img variant='top' src={card2} />
              <Card.Title>Expand your library</Card.Title>
              <Card.Text>Add Recommended Songs to Your Playlists</Card.Text>
            </Card>
          </Col>

          <Col className='col-md-4' style={{ position: 'relative', right: '-150px' }}>
            <Card style={{ width: '450px', height: '350px', position: 'relative', top: '-100px' }}>
              <Card.Img variant='top' src={card3} />
              <Card.Title>Watch new titles</Card.Title>
              <Card.Text>Search Your Favorite Movie for Recommendations</Card.Text>
            </Card>
          </Col>

        </Row>

        <h4 style={{ textAlign: 'center', color: '#fff' }}>
          <b> To get started, choose either songs or movies to get recommendations! </b>
        </h4>
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