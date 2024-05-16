import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
//import { createSelector } from 'reselect';
//import { useSelector, useDispatch } from "react-redux";
import { useDispatch } from "react-redux";

import * as actions from "../store/actions/auth";

/* TODO: use loading and error later
const selectLoading = state => state.auth.loading;
const selectError = state => state.auth.error;

const getState = createSelector(
  [selectLoading, selectError],
  (loading, error) => ({
    loading, error
  })
);
*/

const Login = () => {
  const dispatch = useDispatch();

  //const {loading, error} = useSelector(getState);

  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      dispatch(actions.authLogin(formData.username, formData.password));
      //window.location.href = '/'
    } catch (e)
    {
    }
  };

  return (
    <Container>
      {/*{error && <p>{error.message}</p>}*/}
      {/*loading ? (
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

export default Login;