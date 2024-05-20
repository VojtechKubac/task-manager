import MockAdapter from 'axios-mock-adapter';
import axiosInstance from '../axiosConfig';
import * as actions from '../tasks';
import * as actionTypes from '../actionTypes';

jest.mock('../axiosConfig');

describe('Task Actions', () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axiosInstance);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  test('should create an action to start getting tasks list', () => {
    const expectedAction = {
      type: actionTypes.GET_TASKS_LIST_START
    };
    expect(actions.getTasksListStart()).toEqual(expectedAction);
  });

  test('should create an action for failed getting tasks list', () => {
    const error = 'Failed to get tasks list';
    const expectedAction = {
      type: actionTypes.GET_TASKS_LIST_FAIL,
      error
    };
    expect(actions.getTasksListFail(error)).toEqual(expectedAction);
  });

  test('should create an action for successful getting tasks list', () => {
    const tasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];
    const expectedAction = {
      type: actionTypes.GET_TASKS_LIST_SUCCESS,
      tasks
    };
    expect(actions.getTasksListSuccess(tasks)).toEqual(expectedAction);
  });

  test('should handle getTasks action with valid token', async () => {
    const dispatchMock = jest.fn();
    const token = 'valid_token';
    const mockTasks = [
      { id: 1, title: 'Task 1' },
      { id: 2, title: 'Task 2' }
    ];

    const mockGet = jest.spyOn(axiosInstance, 'get');

    mockGet.mockImplementation(() => Promise.resolve({ data: mockTasks }));

    await actions.getTasks(token)(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith(actions.getTasksListStart());
    expect(dispatchMock).toHaveBeenCalledWith(actions.getTasksListSuccess(mockTasks));
  });

  test('should handle getTasks action with invalid token', async () => {
    const dispatchMock = jest.fn();
    const token = null;

    await actions.getTasks(token)(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith(actions.getTasksListStart());
    expect(dispatchMock).toHaveBeenCalledWith(actions.getTasksListFail());
  });

  test('should handle getTasks action with error', async () => {
    const dispatchMock = jest.fn();
    const token = 'valid_token';
    const mockError = new Error('Failed to get tasks');

    mockAxios.onGet('/tasks/').networkError();

    await actions.getTasks(token)(dispatchMock);

    expect(dispatchMock).toHaveBeenCalledWith(actions.getTasksListStart());
    expect(dispatchMock).toHaveBeenCalledWith(actions.getTasksListFail());
  });
});
