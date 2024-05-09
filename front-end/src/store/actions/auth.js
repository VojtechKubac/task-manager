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

const getCsrfToken = async () => {
  try {
    const res = await axiosInstance.get('/api-auth/login/');
    //alert(axiosInstance.defaults.headers.head);
    //alert(axiosInstance.defaults.headers['X-CSRFToken']);
    //alert(axiosInstance.defaults.headers['set-cookie']);
    //alert(res.headers['set-cookie']);
    //alert(res.headers);
    //alert(Object.keys(res.headers));
    //console.log(res.headers['set-cookie']);
    console.log(res);
    console.log(axiosInstance);
    alert(res.headers['set-cookie']);
    alert(axiosInstance.defaults.headers['X-CSRFToken']);
    return axiosInstance.defaults.headers['X-CSRFToken'];
  } catch (error) {
    console.error('CSRF token error:', error);
    throw error;
  }
};

export const authLogin = (username, password) => async (dispatch) => {
  try {
    dispatch(authStart());

    const csrfToken = await getCsrfToken();
    axiosInstance.defaults.headers['X-CSRFToken'] = csrfToken;

    const res = await axiosInstance.post('/api-auth/login/', {
      username: username,
      password: password
    });

    const user = {
      token: res.data.key,
      username,
      userId: res.data.user,
      expirationDate: new Date(new Date().getTime() + 3600 * 1000)
    };
    localStorage.setItem("user", JSON.stringify(user));
    dispatch(authSuccess(user));
    dispatch(checkAuthTimeout(3600));
  } catch(error) {
    dispatch(authFail(error));
  };
};

/*
export const authLogin = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axiosInstance
      .post("/api-auth/login/", {
        username: username,
        password: password
      })
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};
*/

export const authSignup = (
  username,
  email,
  password1,
  password2,
) => {
  return dispatch => {
    dispatch(authStart());
    const user = {
      username,
      email,
      password1,
      password2,
    };
    axiosInstance
      .post("/api-auth/registration/", user)
      .then(res => {
        const user = {
          token: res.data.key,
          username,
          userId: res.data.user,
          expirationDate: new Date(new Date().getTime() + 3600 * 1000)
        };
        localStorage.setItem("user", JSON.stringify(user));
        dispatch(authSuccess(user));
        dispatch(checkAuthTimeout(3600));
      })
      .catch(err => {
        dispatch(authFail(err));
      });
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
