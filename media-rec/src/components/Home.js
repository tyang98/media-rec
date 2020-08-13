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

        <img src={transparentLogo} className="center mx-auto" style={{ maxWidth: '80%', display: 'block', position: 'relative', bottom: '6vw' }} />
        <Row >
          <Col className='col-md-4' style={{ position: 'relative', right: '2vw' }}>
            <Card style={{ width: '100%', height: '100%', position: 'relative', bottom: '12vw', marginBottom: '2%' }}>
              <Card.Img variant='top' src={card1} />
              <Card.Title style={{ marginLeft: '2%' }}>Integrated with Spotify</Card.Title>
              <Card.Subtitle style={{ marginLeft: '2%' }}>Search Songs for Recommendations</Card.Subtitle>
            </Card>
          </Col>

          <Col className='col-md-4'>
            <Card style={{ width: '100%', height: '100%', position: 'relative', bottom: '12vw', marginBottom: '2%' }}>
              <Card.Img variant='top' src={card2} />
              <Card.Title style={{ marginLeft: '2%' }}>Expand your library</Card.Title>
              <Card.Subtitle style={{ marginLeft: '2%' }}>Add Recommended Songs to Your Playlists</Card.Subtitle>
            </Card>
          </Col>

          <Col className='col-md-4' style={{ position: 'relative', left: '2vw' }}>
            <Card style={{ width: '100%', height: '100%', position: 'relative', bottom: '12vw', marginBottom: '2%' }}>
              <Card.Img variant='top' src={card3} />
              <Card.Title style={{ marginLeft: '2%' }}>Watch new titles</Card.Title>
              <Card.Subtitle style={{ marginLeft: '2%' }}>Search Movies for Recommendations</Card.Subtitle>
            </Card>
          </Col>
          <h4 className="mx-auto" style={{ textAlign: 'center', color: '#fff', position: 'relative', bottom: '8vw' }}>
            <b> To get started, choose either songs or movies to get recommendations! </b>
          </h4>
        </Row>
      </div >
      <Container className="mx-auto">
        <Row>
          <Col style={{ position: 'relative', bottom: '6vw' }}>
            <Button size="lg" className="col-md-12" onClick={handleLogin}> Songs </Button>
          </Col>
          <Col style={{ position: 'relative', bottom: '6vw' }}>
            <NavLink to="/moviesrec">
              <Button size="lg" className="col-md-12" >Movies</Button>
            </NavLink>
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default Home