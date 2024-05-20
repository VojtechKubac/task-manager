import reducer, { initialState } from '../auth';
import * as actionTypes from '../../actions/actionTypes';

describe('auth reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  test('should handle AUTH_START', () => {
    const action = { type: actionTypes.AUTH_START };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: null,
      loading: true
    });
  });

  test('should handle AUTH_SUCCESS', () => {
    const action = {
      type: actionTypes.AUTH_SUCCESS,
      user: {
        token: 'test_token',
        username: 'testuser'
      }
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      token: 'test_token',
      username: 'testuser',
      error: null,
      loading: false
    });
  });

  test('should handle AUTH_FAIL', () => {
    const action = {
      type: actionTypes.AUTH_FAIL,
      error: 'test_error'
    };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      error: 'test_error',
      loading: false
    });
  });

  test('should handle AUTH_LOGOUT', () => {
    const action = { type: actionTypes.AUTH_LOGOUT };
    expect(reducer(initialState, action)).toEqual({
      ...initialState,
      token: null,
      username: null
    });
  });
});
