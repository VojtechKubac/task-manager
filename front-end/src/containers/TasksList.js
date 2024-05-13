import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import * as actions from "../store/actions/tasks";

const selectToken = state => state.auth.token;
const selectTasks = state => state.tasks.tasks;
//const selectLoading = state => state.tasks.loading;

// create selector with memoization to prevent unncessary operations
const getTasksList = createSelector(
  [selectToken, selectTasks/*, selectLoading*/],
  (token, tasks/*, loading*/) => ({
    token,
    tasks,
    //loading,
  })
);

const TasksList = () => {
  const dispatch = useDispatch();

  const { token, tasks/*, loading*/ } = useSelector(getTasksList);

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
    }
  }, [token]);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      dispatch(actions.getTasks(storedToken));
    }
  }, [dispatch]);

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