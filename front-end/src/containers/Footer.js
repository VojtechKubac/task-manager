import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-light py-4">
      <Container>
        <Row>
          <Col md={6}>
            <p>&copy; {new Date().getFullYear()} Task Manager. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-md-right">
            <ul className="list-inline mb-0">
              {/*
              <li className="list-inline-item"><a href="#">Privacy Policy</a></li>
              <li className="list-inline-item"><a href="#">Terms of Service</a></li>
              <li className="list-inline-item"><a href="#">Contact</a></li>
  */}
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
