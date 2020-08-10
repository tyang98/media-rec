
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Accordion, Card, Container, Row, Col } from 'react-bootstrap';
import Song from './Song.js';
import AddIcon from '@material-ui/icons/Add';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

function PlaylistCollapse({ playlists, addSong, removeSong }) {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(!expand);
    }
  }

  return (

    <Accordion defaultActiveKey="0">
      {playlists.map((playlist, index) => {
        index++;
        return (
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey={`${index}`} onClick={handleExpand}>
              <Container>
                <Row>
                  <Col xs={10}><b> {playlist.name} </b></Col>
                  <Col xs={2}>{expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}</Col>
                </Row>
              </Container>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={`${index}`}>
              <Card.Body>
                <Container className="overflow-auto" style={{ maxHeight: "1000px" }}>
                  {playlist.tracksList == null && playlist.tracksList.length !== 0 ? (
                    <div></div>
                  ) : (
                      playlist.tracksList.map((song, index) => (
                        <Song
                          key={index}
                          song={song}
                          addSong={addSong}
                          removeSong={removeSong}
                          symbol={<AddIcon />}
                        />
                      ))
                    )}
                </Container>

              </Card.Body>
            </Accordion.Collapse>
          </Card>
        );
      }
      )}
    </Accordion>
  );
}

export default PlaylistCollapse