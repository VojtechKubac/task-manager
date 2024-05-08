import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/tasks";

import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
//import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

//class TasksList extends Component {
class TasksList extends PureComponent {
  componentDidMount() {
    // TODO: authentication
    this.props.getTasks();
  };

  componentWillReceiveProps(newProps) {
    // TODO: authentication
    //this.props.getTasks();
  };

  render() {
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
          TASK LIST
        </Row>

        <hr />
        <Row>
          <Col md={{ span: 5, offset: 4 }}>
            <ListGroup>
              {this.props.tasks.map((task, index) => {
                return (
                  <div key = {index} >
                    <ListGroup.Item
                      variant="dark"
                      action
                      style={{display:"flex",
                          justifyContent:'space-between'
                        }}
                    >
                    {task.name}
                    <span>
{/*
TODO:
                      <Button style={{marginRight:"10px"}}
                        variant = "light"
                        onClick={() => this.deleteItem(task.id)}>
                        Delete
                      </Button>
                      <Button variant = "light"
                        onClick={() => this.editItem(index)}>
                        Edit
                      </Button>
            */}
                    </span>
                    </ListGroup.Item>
                  </div>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}


const mapStateToProps = state => {
  return {
    // TODO:
    //token: state.auth.token,
    tasks: state.tasks.tasks,
    loading: state.tasks.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTasks: token => dispatch(actions.getTasks(token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TasksList);
