import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from "react-redux";

import * as actions from "../store/actions/auth";

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  handleInputChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value,
		});
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onAuth(this.state.username, this.state.password);
    //this.props.history.push("/");
  };

  render () {
    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

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
                      value={this.state.userName}
                      name="username"
                      onChange={this.handleInputChange}
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
                      value={this.state.password}
                      name="password"
                      onChange={this.handleInputChange}
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
