import React from "react";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import * as actions from "../store/actions/auth";

const Logout = () => {
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    try {
      dispatch(actions.logout());
    } catch (e)
    {
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
        <Col>
          LOG OUT
        </Col>
      </Row>

      <hr />
      <Row>
        <Col>
          Username:
        </Col>
        <Col>
          <input
            type="text"
            id="username"
            value={username ? username : 'no user'}
            readOnly
          />
        </Col>
      </Row>
      <Button variant="primary" type="button" onClick={handleLogout}>
        Log out
      </Button>
    </Container>
  );
};

export default Logout;