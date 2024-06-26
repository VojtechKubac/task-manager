import axiosInstance from "./axiosConfig";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = user => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(authStart());
    const res = await axiosInstance.post('/auth/token/login/', {
      username: username,
      password: password
    });

    const user = {
      token: res.data.auth_token,
      username,
      //userId: res.data.user,
      expirationDate: new Date(new Date().getTime() + 3600 * 1000)
    };

    localStorage.setItem("user", JSON.stringify(user));
    dispatch(authSuccess(user));
    dispatch(checkAuthTimeout(3600));
  } catch(error) {
    dispatch(authFail(error));
  };
};

export const authSignup = (
  username,
  email,
  password,
) => async (dispatch) => {
  try {
    console.log('authSignup')
    dispatch(authStart());
    const user = {
        username,
        email,
        password,
      };
    //const res = await axiosInstance.post("/users/", user)
    await axiosInstance.post("/users/", user)

    localStorage.setItem("user", JSON.stringify(user));
    dispatch(authSuccess(user));
    dispatch(checkAuthTimeout(3600));
  } catch(error)
  {
    dispatch(authFail(error));
  };
};

export const authCheckState = () => {
  return dispatch => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === undefined || user === null) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(user.expirationDate);
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(user));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
