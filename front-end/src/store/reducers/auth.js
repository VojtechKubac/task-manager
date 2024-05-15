import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const storedState = JSON.parse(localStorage.getItem('reduxState'));

const initialState = storedState ? storedState : {
  token: null,
  username: null,
  //userId: null,
  error: null,
  loading: false
};

const authStart = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: true
  });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.user.token,
    username: action.user.username,
    //userId: action.user.userId,
    error: null,
    loading: false
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
};

const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    username: null
  });
};

const reducer = (state = initialState, action) => {
  let updatedState;
  switch (action.type) {
    case actionTypes.AUTH_START:
      updatedState = authStart(state, action);
      break;
    case actionTypes.AUTH_SUCCESS:
      updatedState = authSuccess(state, action);
      break;
    case actionTypes.AUTH_FAIL:
      updatedState = authFail(state, action);
      break;
    case actionTypes.AUTH_LOGOUT:
      updatedState = authLogout(state, action);
      break;
    default:
      updatedState = state;
  }

  // Store the updated state in localStorage
  localStorage.setItem('reduxState', JSON.stringify(updatedState));

  return updatedState;
};


export default reducer;
