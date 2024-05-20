import React from "react";
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Signup from "../Signup";

describe('Signup', () => {
  const mockStore = configureStore([]);

  const store = mockStore({
  });

  test('renders without crash', () => {
    render(
      <Provider store={store}>
        <Signup />
      </Provider>
    );

    expect(screen.getByText('SIGN UP')).toBeInTheDocument();
   });

test('updates username input value', () => {
  const dispatchMock = jest.fn();
  store.dispatch = dispatchMock;

  render(
    <Provider store={store}>
      <Signup />
    </Provider>
  );

  const usernameInput = screen.getByLabelText('Username');
  fireEvent.change(usernameInput, { target: { value: 'testUsername' } });

  expect(usernameInput.value).toBe('testUsername');
});

test('updates email input value', () => {
  const dispatchMock = jest.fn();
  store.dispatch = dispatchMock;

  render(
    <Provider store={store}>
      <Signup />
    </Provider>
  );

  const emailInput = screen.getByLabelText('E-mail');
  fireEvent.change(emailInput, { target: { value: 'testmail@taskmanager.com' } });

  expect(emailInput.value).toBe('testmail@taskmanager.com');
});

test('validates form submission with invalid data', () => {
  const dispatchMock = jest.fn();
  store.dispatch = dispatchMock;

  render(
    <Provider store={store}>
      <Signup />
    </Provider>
  );

  const submitButton = screen.getByText('Submit');
  fireEvent.click(submitButton);

  expect(dispatchMock).not.toHaveBeenCalled();
});

test('validates form submission with valid email but mismatched passwords', () => {
  const dispatchMock = jest.fn();
  store.dispatch = dispatchMock;

  render(
    <Provider store={store}>
      <Signup />
    </Provider>
  );

  const emailInput = screen.getByLabelText('E-mail');
  const confirmPasswordInput = screen.getByLabelText('Confirm password');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'testmail@taskmanager.com' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'testPWD1' } });

  fireEvent.click(submitButton);

  expect(dispatchMock).not.toHaveBeenCalled();
});

test('validates form submission with valid data', () => {
  const dispatchMock = jest.fn();
  store.dispatch = dispatchMock;

  render(
    <Provider store={store}>
      <Signup />
    </Provider>
  );

  const emailInput = screen.getByLabelText('E-mail');
  const passwordInput = screen.getByLabelText('Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm password');
  const submitButton = screen.getByText('Submit');

  fireEvent.change(emailInput, { target: { value: 'testmail@taskmanager.com' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'testPWD1' } });
  fireEvent.change(passwordInput, { target: { value: 'testPWD1' } });

  fireEvent.click(submitButton);

  expect(dispatchMock).toHaveBeenCalled();
  });
 });