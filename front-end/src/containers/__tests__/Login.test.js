import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from '../Login'

describe('Login', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
    auth: { username: 'testuser' },
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  test('updates the form data on input change', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(usernameInput, { target: { value: 'testUsername' } });
    fireEvent.change(passwordInput, { target: { value: 'testPassword' } });

    expect(usernameInput.value).toBe('testUsername');
    expect(passwordInput.value).toBe('testPassword');
  });

  test('dispatches the authLogin action on form submission', () => {
    const dispatchMock = jest.fn();
    store.dispatch = dispatchMock;

    const { getByText } = render(
      <Provider store={store}>
        <Login />
      </Provider>
    );

    const submitButton = getByText('Submit');

    fireEvent.click(submitButton);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
  });
});
