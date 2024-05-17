
import React from "react";
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../../store/reducers/tasks'; // Import your root reducer
import * as actions from "../../store/actions/tasks";
import TasksList from "../TasksList";

/*
describe('TasksList', () => {
  const mockStore = configureStore([]);

  test('renders the component with tasks', () => {
    const store = mockStore({
      auth: { token: 'testToken' },
      tasks: { tasks: [{ name: 'Task 1' }, { name: 'Task 2' }] },
    });

    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    expect(screen.getByText('TASK LIST')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });
*/

  /*
  test('dispatches getTasks action with stored token', () => {
    const store = mockStore({
      auth: { token: 'testToken' },
      tasks: { tasks: [] },
    });

    jest.spyOn(Storage.prototype, 'getItem').mockReturnValue('testToken');
    jest.spyOn(actions, 'getTasks').mockReturnValue({ type: 'GET_TASKS' });

    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    expect(actions.getTasks).toHaveBeenCalledWith('testToken');
  });
*/
//});




const mockStore = configureStore([]);

describe('TasksList', () => {
  test('renders the component with tasks', () => {
    const store = mockStore({
      auth: { token: 'testToken' },
      tasks: { tasks: [{ name: 'Task 1' }, { name: 'Task 2' }] },
    });

    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    expect(screen.getByText('TASK LIST')).toBeInTheDocument();
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('dispatches getTasks action with token', async () => {
    const store = mockStore({
      auth: { token: 'testToken' },
      tasks: { tasks: [] },
    });

    const dispatchMock = jest.fn();
    store.dispatch = dispatchMock;

    jest.spyOn(actions, 'getTasks');

    render(
      <Provider store={store}>
        <TasksList />
      </Provider>
    );

    expect(actions.getTasks).toHaveBeenCalledWith('testToken');
  });
});