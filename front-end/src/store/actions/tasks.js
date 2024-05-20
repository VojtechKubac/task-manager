import axiosInstance from "./axiosConfig";
import * as actionTypes from "./actionTypes";

export const getTasksListStart = () => {
  return {
    type: actionTypes.GET_TASKS_LIST_START
  };
};

export const getTasksListFail = (error) => {
  return {
    type: actionTypes.GET_TASKS_LIST_FAIL,
    error: error
  };
};

export const getTasksListSuccess = (tasks) => {
  return {
    type: actionTypes.GET_TASKS_LIST_SUCCESS,
    tasks
  };
};

export const getTasks = (token) => async (dispatch) => {
  try {
    dispatch(getTasksListStart());

    if (token)
    {
      axiosInstance.defaults.headers.common['Authorization'] = 'Token ' + token;

      const res = await axiosInstance.get("/tasks/");
      const tasks = res.data;
      dispatch(getTasksListSuccess(tasks));
    }
    else{
      dispatch(getTasksListFail());
    }
  } catch (err) {
    dispatch(getTasksListFail());
  }
  };
