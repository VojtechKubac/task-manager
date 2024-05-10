import React, { useState, Component } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

const Login = ({ loading, error, onAuth }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuth(formData.username, formData.password);
  };

  return (
    <Container>
      {error && <p>{error.message}</p>}
      {/*this.props.loading ? (
        //<Spin indicator={antIcon} />
      ) : */(
        <>
          <Row
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "3rem",
              fontWeight: "bolder",
            }}
          >
          LOG IN
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
                    value={formData.userName}
                    name="username"
                    onChange={handleInputChange}
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
                  />
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </>

    )}
    </Container>
  );
};

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);