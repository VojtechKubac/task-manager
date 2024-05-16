import React from "react";
import { render, screen, fireEvent, getByTestId, getByLabelText } from '@testing-library/react'
import { Provider } from "react-redux";
import configureStore from 'redux-mock-store'
import Logout from "../Logout";

describe('Logout', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    auth: { username: 'testuser' },
  });

  test('renders withou crashing', () => {
    render(
      <Provider store={store}>
        <Logout />
      </Provider>
    );

    expect(screen.getByText('LOG OUT')).toBeInTheDocument();
  });

  test('username read correctly', () => {
    render(
      <Provider store={store}>
        <Logout />
      </Provider>
    );

    expect(screen.getByDisplayValue('testuser')).toBeInTheDocument();
  });

  test('display no user correctly', () => {
    const emptyStore = mockStore({
      auth: {username: null },
    });

    render(
      <Provider store={emptyStore}>
        <Logout />
      </Provider>
    );

    expect(screen.getByDisplayValue('no user')).toBeInTheDocument();
  });

  test('dispatches the logout action', () => {
    const dispatchMock = jest.fn();
    store.dispatch = dispatchMock;

    const { getByText } = render(
      <Provider store={store}>
        <Logout />
      </Provider>
    );

    const logoutButton = getByText('Log out');

    fireEvent.click(logoutButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});