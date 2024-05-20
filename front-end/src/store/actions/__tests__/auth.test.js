import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../axiosConfig';
import * as actions from '../auth';
import * as actionTypes from '../actionTypes';

jest.mock('../axiosConfig');

describe('Auth Actions', () => {
  let mockAxios;
  let dispatchMock;
  jest.useFakeTimers();

  beforeEach(() => {
    mockAxios = new MockAdapter(axiosInstance);
    dispatchMock = jest.fn();
  });

  afterEach(() => {
    mockAxios.restore();
  });

  test('should create an action to start authentication', () => {
    const expectedAction = { type: actionTypes.AUTH_START };
    expect(actions.authStart()).toEqual(expectedAction);
  });

  test('should create an action for successful authentication', () => {
    const user = {
      token: 'test_token',
      username: 'testuser',
      expirationDate: new Date(new Date().getTime() + 3600 * 1000)
    };
    const expectedAction = { type: actionTypes.AUTH_SUCCESS, user };
    expect(actions.authSuccess(user)).toEqual(expectedAction);
  });

  test('should create an action for failed authentication', () => {
    const error = 'Authentication failed';
    const expectedAction = { type: actionTypes.AUTH_FAIL, error };
    expect(actions.authFail(error)).toEqual(expectedAction);
  });

  test('should create an action for logout', () => {
    const expectedAction = { type: actionTypes.AUTH_LOGOUT };
    expect(actions.logout()).toEqual(expectedAction);
  });

  test('should handle authLogin action', async () => {
    const username = 'testuser';
    const password = 'testpassword';
    const authToken = 'test_token';

    const mockPost = jest.spyOn(axiosInstance, 'post');

    mockPost.mockImplementation(() => Promise.resolve({ data: { auth_token: authToken } }));

    await actions.authLogin(username, password)(dispatchMock);
    expect(dispatchMock).toHaveBeenCalledWith(actions.authStart());
    expect(dispatchMock).toHaveBeenCalledWith(actions.authSuccess({
      token: authToken,
      username: username,
      expirationDate: expect.any(Date)
    }));
  });

  test('should handle checkAuthTimeout action', () => {
    const expirationTime = 5;
    const dispatchMock = jest.fn();

    actions.checkAuthTimeout(expirationTime)(dispatchMock);

    jest.advanceTimersByTime(expirationTime * 1000);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(actions.logout());
  });


  test('dispatches authStart and authSuccess on successful login', async () => {
    const mockToken = 'mockToken';
    const mockUsername = 'mockUsername';
    const mockPassword = 'mockPassword';
    const mockResponse = { data: { auth_token: mockToken } };

    axiosInstance.post.mockResolvedValue(mockResponse);

    await actions.authLogin(mockUsername, mockPassword)(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith(actions.authStart());
    expect(dispatchMock).toHaveBeenCalledWith(actions.authSuccess({
      token: mockToken,
      username: mockUsername,
      expirationDate: expect.any(Date)
    }));
  });

  test('dispatches authFail on login error', async () => {
    const mockError = new Error('Login failed');

    const mockPost = jest.spyOn(axiosInstance, 'post');

    mockPost.mockImplementation(() => Promise.reject(mockError));

    await actions.authLogin('mockUsername', 'mockPassword')(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith(actions.authFail(mockError));
  });

  test('should handle authSignup action', async () => {
    const username = 'testuser';
    const email = 'test@example.com';
    const password = 'testpassword';

    const mockUser = {username, email, password};

    const mockPost = jest.spyOn(axiosInstance, 'post');

    mockPost.mockImplementation(() => Promise.resolve());

    await actions.authSignup(username, email, password)(dispatchMock);
    expect(dispatchMock).toHaveBeenCalledWith(actions.authStart());
    expect(dispatchMock).toHaveBeenCalledWith(actions.authSuccess(mockUser));
  });

  test('dispatches logout action if user is not in localStorage', () => {
    const dispatchMock = jest.fn();
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);

    actions.authCheckState()(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(actions.logout());
  });

  test('dispatches logout action if user is expired', () => {
    const dispatchMock = jest.fn();
    const expiredUser = {
      token: 'test_token',
      username: 'testuser',
      expirationDate: new Date(new Date().getTime() - 3600 * 1000).toISOString()
    };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(expiredUser));

    actions.authCheckState()(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith(actions.logout());
  });

  test('dispatches authSuccess and checkAuthTimeout actions if user is valid', () => {
    const dispatchMock = jest.fn();
    const validUser = {
      token: 'test_token',
      username: 'testuser',
      expirationDate: new Date(new Date().getTime() + 3600 * 1000).toISOString()
    };
    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(validUser));

    actions.authCheckState()(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledTimes(2);
    expect(dispatchMock).toHaveBeenCalledWith(actions.authSuccess(validUser));
  });
});
