import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import * as actions from "../store/actions/tasks";

const TasksList = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const tasks = useSelector((state) => state.tasks.tasks);

  useEffect(() => {
    try{
      dispatch(actions.getTasks(token));
    } catch (e)
    {
    }
  }, [dispatch, token]);

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
            {tasks.map((task, index) => (
              <div key={index}>
                <ListGroup.Item
                  variant="dark"
                  action
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  {task.name}
                </ListGroup.Item>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TasksList;