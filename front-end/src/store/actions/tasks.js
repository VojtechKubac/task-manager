import axiosInstance from "./axiosConfig";
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
export const getTasks = (token) => async (dispatch) => {
  try {
    dispatch(getTasksListStart());

    axiosInstance.defaults.headers.common['Authorization'] = 'Token ' + token;

    const res = await axiosInstance.get("/tasks/");
    const tasks = res.data;
    dispatch(getTasksListSuccess(tasks));
  } catch (err) {
    dispatch(getTasksListFail());
  }
  };
