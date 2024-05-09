import React, { Component } from "react";
import { Form, Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAuth(this.props.userName, this.props.password);
    //this.props.history.push("/");
  };

  render () {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    //const { getFieldDecorator } = this.props.form;
    return (
      <>
        {errorMessage}
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
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Group as={Row} controlId="formBasicUsername">
                <Form.Label column sm={3}>Username</Form.Label>
                  <Col sm={9}>
                    <Form.Control
                      placeholder="Enter username"
                      size="lg"
                      maxLength={30}
                      style={{ maxWidth: '300px' }}
                      value={this.props.userName}
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
                      value={this.props.password}
                    />
                  </Col>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </>

      )}
      </>


      /*
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    */
    );
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (username, password) =>
      dispatch(actions.authLogin(username, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
