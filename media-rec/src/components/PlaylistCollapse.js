
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card } from 'react-bootstrap';

function PlaylistCollapse({ name, playlists, content }) {
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="0">
          {name}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="0">
          <Card.Body>
            {content}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  )
}