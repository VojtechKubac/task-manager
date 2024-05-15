/*
import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  test('renders without crashing', () => {
    render(<Header />);
  });

});
*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../Header';

describe('Header', () => {
  const mockStore = configureStore([]);

  test('renders without crashing', () => {
    const store = mockStore({
      auth: { username: 'testuser' },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );
  });

  test('displays the correct navigation links', () => {
    const store = mockStore({
      auth: { username: 'testuser' },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Tasks')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
  });

  it('displays the login link when no user is logged in', () => {
    const store = mockStore({
      auth: { username: null },
    });

    render(
      <Provider store={store}>
        <Router>
          <Header />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Login')).toBeInTheDocument();
  });
});
