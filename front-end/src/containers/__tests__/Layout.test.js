import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Layout from '../Layout';

const mockStore = configureStore([]);

describe('Layout', () => {
  const store = mockStore({
    auth: { username: 'testuser' },
  });

  test('renders Header, main content, and Footer', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>
            <div>Test Content</div>
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  test('renders main content in the correct order', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Layout>
            <div>Child Component 1</div>
            <div>Child Component 2</div>
          </Layout>
        </MemoryRouter>
      </Provider>
    );

    const mainContent = screen.getByRole('main');
    const children = mainContent.children;

    expect(children[0].textContent).toBe('Child Component 1');
    expect(children[1].textContent).toBe('Child Component 2');
  });
});