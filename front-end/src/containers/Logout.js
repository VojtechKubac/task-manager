import React, { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";
import { createSelector } from 'reselect';
import { useSelector } from "react-redux";

import * as actions from "../store/actions/auth";

const selectUserName = state => state.auth.username;

const getUserName = createSelector(
  [selectUserName],
  (username) => ({username})
);

//const Logout = ({user, onLogout }) => {
const Logout = ({onLogout }) => {
  const handleLogout = () => onLogout();

  const {username} = useSelector(getUserName);

  useEffect(() => {
    console.log('useEffect');
    if (username) {
      console.log('set');
      localStorage.setItem('authUser', username);
    }
  }, [username]);

  console.log('logout');
  //console.log(user);
  console.log(username);

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
            //value={username ? username : 'no user'}
            value={localStorage.getItem('authUser') ? localStorage.getItem('authUser') : 'no user'}
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

const mapStateToProps = state => ({
    user: state.auth.user,
});

const mapDispatchToProps = dispatch => ({
    onLogout: () =>
      dispatch(actions.logout())
});

export default connect(
  null, //mapStateToProps,
  mapDispatchToProps
)(Logout);