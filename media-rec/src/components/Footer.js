import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container, Row } from 'react-bootstrap';

function Footer() {

  return (
    <div className="Footer">
      <div className="footer-middle">
        <Container>
          <Row>
            <div className="col-md-3 col-sm-6">

            </div>
          </Row>
          <div className="footer-bottom">
            <p className="text-xs-center mx-auto">
              &copy; mediaRec {new Date().getFullYear()}
            </p>
          </div>
        </Container>
      </div>
    </div>
  );

}

export default Footer;
