import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";

import * as actions from "../store/actions/auth";

const Signup = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
   });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
    } else {
      // Passwords match, proceed with form submission or further processing
      setError('');
      try {
        dispatch(actions.authSignup(formData.username, formData.email, formData.password));
        //window.location.href = '/'
      } catch (e)
      {
      }
    }
  };

  return (
    <Container>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "3rem",
          fontWeight: "bolder",
        }}
      >
      SIGN UP
      </Row>

      <hr />
      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Group as={Row} controlId="formBasicUsername">
          <Form.Label column sm={3}>Username</Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Enter username"
                size="lg"
                maxLength={30}
                style={{ maxWidth: '300px' }}
                value={formData.username}
                name="username"
                onChange={handleInputChange}
                required
              />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicEmail">
          <Form.Label column sm={3}>E-mail</Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Enter e-mail"
                type="email"
                size="lg"
                maxLength={30}
                style={{ maxWidth: '300px' }}
                value={formData.email}
                name="email"
                onChange={handleInputChange}
                required
              />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPassword">
          <Form.Label column sm={3}>Password</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Password"
                size="lg"
                maxLength={30}
                style={{ maxWidth: '300px' }}
                value={formData.password}
                name="password"
                onChange={handleInputChange}
                required
              />
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formBasicPasswordConfirmation">
          <Form.Label column sm={3}>Confirm password</Form.Label>
            <Col sm={9}>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                size="lg"
                maxLength={30}
                style={{ maxWidth: '300px' }}
                value={formData.confirmPassword}
                name="confirmPassword"
                onChange={handleInputChange}
              />
            </Col>
        </Form.Group>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Signup;