import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Row, Col, ListGroup, Card } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import background from '.././images/background.png';
import transparentLogo from './../images/logo-transparent.png'

function Home({ handleLogin }) {
  return (

    <div>
      <img src={background} style={{ minHeight: '100%', minWidth: '100%', position: 'fixed', top: '0', left: '0', zIndex: '-1', filter: 'brightness(50%)' }} />
      <div className="container" styles={{ display: 'flex', justifyContent: 'center' }}>

        <img src={transparentLogo} className="center mx-auto" style={{ maxWidth: '750px', display: 'block', position: 'relative', top: '-60px' }} />
        <Row fluid>
          <Col className='col-md-4'>
            <Card style={{ width: '300px', height: '350px', position: 'relative', top: '-75px' }}>
              <Card.Img variant='top' src={background} />
              <Card.Title>Title</Card.Title>
              <Card.Text>Some card text</Card.Text>
            </Card>
          </Col>

          <Col className='col-md-4'>
            <Card style={{ width: '300px', height: '350px', position: 'relative', top: '-75px' }}>
              <Card.Img variant='top' src={background} />
              <Card.Title>Title</Card.Title>
              <Card.Text>Some card text</Card.Text>
            </Card>
          </Col>

          <Col className='col-md-4'>
            <Card style={{ width: '300px', height: '350px', position: 'relative', top: '-75px' }}>
              <Card.Img variant='top' src={background} />
              <Card.Title>Title</Card.Title>
              <Card.Text>Some card text</Card.Text>
            </Card>
          </Col>

        </Row>

        <h4 style={{ textAlign: 'center', color: '#fff', marginTop: '2%' }}>
          <b> To get started, choose either songs or movies to get recommendations! </b>
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