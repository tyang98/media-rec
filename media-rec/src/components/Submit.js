import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

function Submit({ createPlaylist }) {
  const [show, setShow] = useState(false);
  const [term, setTerm] = useState('');

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const handleSubmit = () => {
    createPlaylist(term);
    setShow(false);
  }

  return (
    <>
      <Button variant="primary" className="button" onClick={handleShow}>
        Add to Your Playlists
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Modal.Title>Enter Title of Playlist</Modal.Title>
          <input
            onChange={e => setTerm(e)}
            className="input"
            placeholder="Enter Name"
            value={term}
          >
          </input>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Submit;