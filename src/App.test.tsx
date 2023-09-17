import React from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider } from '@apollo/client';
import { client } from './services/client';
import App from './App';

// Mock the window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Mock any other methods used by your code
    removeListener: jest.fn(), // Mock any other methods used by your code
  }),
});

test('renders App component without errors', () => {
  render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
});