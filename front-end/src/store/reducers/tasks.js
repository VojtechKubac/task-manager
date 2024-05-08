import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  tasks: [],
  error: null,
  loading: false
};

const getTasksListStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const getTasksListSuccess = (state, action) => {
  return updateObject(state, {
    tasks: action.tasks,
    error: null,
    loading: false
  });
};

const getTasksListFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_TASKS_LIST_START:
      return getTasksListStart(state, action);
    case actionTypes.GET_TASKS_LIST_SUCCESS:
      return getTasksListSuccess(state, action);
    case actionTypes.GET_TASKS_LIST_FAIL:
      return getTasksListFail(state, action);
    default:
      return state;
  }
};

export default reducer;
