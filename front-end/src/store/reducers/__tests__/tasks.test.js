import reducer from '../tasks';
import * as actionTypes from '../../actions/actionTypes';

describe('Tasks Reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      tasks: [],
      error: null,
      loading: false
    });
  });

  test('should handle GET_TASKS_LIST_START', () => {
    const action = { type: actionTypes.GET_TASKS_LIST_START };
    const newState = reducer(undefined, action);
    expect(newState).toEqual({
      tasks: [],
      error: null,
      loading: true
    });
  });

  test('should handle GET_TASKS_LIST_SUCCESS', () => {
    const tasks = [{ id: 1, title: 'Task 1' }, { id: 2, title: 'Task 2' }];
    const action = { type: actionTypes.GET_TASKS_LIST_SUCCESS, tasks };
    const newState = reducer(undefined, action);
    expect(newState).toEqual({
      tasks,
      error: null,
      loading: false
    });
  });

  test('should handle GET_TASKS_LIST_FAIL', () => {
    const error = 'Failed to fetch tasks';
    const action = { type: actionTypes.GET_TASKS_LIST_FAIL, error };
    const newState = reducer(undefined, action);
    expect(newState).toEqual({
      tasks: [],
      error,
      loading: false
    });
  });

  test('should return current state for unknown action type', () => {
    const currentState = {
      tasks: [{ id: 1, title: 'Task 1' }],
      error: null,
      loading: false
    };
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = reducer(currentState, action);
    expect(newState).toEqual(currentState);
  });
});