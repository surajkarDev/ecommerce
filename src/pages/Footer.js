import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              Welcome to our BuyFresh ecommerce store. We provide high-quality products at affordable prices. Shop with us for the best experience.
            </p>
          </Col>

          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
              <Nav.Link as={Link} to="/allproduct" className="text-white">Shop</Nav.Link>
              <Nav.Link as={Link} to="/blogs" className="text-white">Blogs</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="text-white">Contact</Nav.Link>
            </Nav>
          </Col>

          <Col md={4}>
            <h5>Follow Us</h5>
            <div className="d-flex">
              <Nav.Link href="https://www.facebook.com" target='_blank' className="text-white me-3">
                <FaFacebook size={30} />
              </Nav.Link>
              <Nav.Link href="https://www.twitter.com" target='_blank' className="text-white me-3">
                <FaTwitter size={30} />
              </Nav.Link>
              <Nav.Link href="https://www.instagram.com" target='_blank' className="text-white">
                <FaInstagram size={30} />
              </Nav.Link>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Your Store Name. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
