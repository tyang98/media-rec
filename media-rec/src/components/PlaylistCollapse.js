
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card, Container, ListGroup, Collapse, Button, Image, Row, Col } from 'react-bootstrap';
import Song from './Song.js';
import AddIcon from '@material-ui/icons/Add';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function PlaylistCollapse({ playlists, addSong, removeSong }) {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
  }

  return (
    <ListGroup className="justify-content-md-center" horizontal>
      <Accordion defaultActiveKey="0">
        {playlists.map((playlist, index) => {
          index++;
          return (
            <Card>
              <Accordion.Toggle as={Card.Header} eventKey={`${index}`} onClick={handleExpand}>
                <Container className="overflow-auto">
                  <Row>
                    <Col xs={9}>{playlist.name}</Col>
                    <Col xs={3}>{expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Col>
                  </Row>
                </Container>
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${index}`}>
                <Card.Body>
                  Hello
              </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        }
        )}
      </Accordion>
    </ListGroup>
  );
}

export default PlaylistCollapse