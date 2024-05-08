import axios from "axios";
import * as actionTypes from "./actionTypes";

const getTasksListStart = () => {
  return {
    type: actionTypes.GET_TASKS_LIST_START
  };
};

const getTasksListFail = (error) => {
  return {
    type: actionTypes.GET_TASKS_LIST_FAIL,
    error: error
  };
};

const getTasksListSuccess = (tasks) => {
  return {
    type: actionTypes.GET_TASKS_LIST_SUCCESS,
    tasks
  };
};

// TODO: do authentication
export const getTasks = () => {
  return dispatch => {
    dispatch(getTasksListStart());

    axios
      .get("http://localhost:8000/tasks/")
      //.get("http://127.0.0.1:8000/tasks/")
      .then((res) => {
        const tasks = res.data;
        dispatch(getTasksListSuccess(tasks));
      })
      .catch((err) => {
        dispatch(getTasksListFail());
      });
    };
  };