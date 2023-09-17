import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { useReposQuery } from '../services/RepoServices';
import { RepoList } from './RepoList';

// Mock the window.matchMedia function
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Mock any other methods used by your code
    removeListener: jest.fn(), // Mock any other methods used by your code
    addEventListener: jest.fn(), // Mock any other methods used by your code
    removeEventListener: jest.fn(), // Mock any other methods used by your code
    dispatchEvent: jest.fn(), // Mock any other methods used by your code
  }),
});

jest.mock('../services/RepoServices', () => ({
  useReposQuery: jest.fn(),
}));

describe('RepoList', () => {
  const mockUsername = 'testuser';
  const mockRepositories = {
    user: {
      repositories: {
        nodes: [],
        pageInfo: {
          hasNextPage: false,
          endCursor: null,
        },
      },
    },
  };

  beforeEach(() => {
    (useReposQuery as jest.Mock).mockReturnValue([
      jest.fn(),
      { loading: false, error: null, data: mockRepositories, fetchMore: jest.fn() },
    ]);
  });

  test('renders RepoList component without errors', () => {
    render(<RepoList />);
  });

  test('fetches repositories when button is clicked', async () => {
    const { getByPlaceholderText, getByText } = render(<RepoList />);

    const usernameInput = getByPlaceholderText('GitHub Username');
    const fetchButton = getByText('Fetch Repositories');

    fireEvent.change(usernameInput, { target: { value: mockUsername } });
    fireEvent.click(fetchButton);

    await waitFor(() => {
      expect(useReposQuery).toHaveBeenCalledWith(mockUsername, null);
    });
  });

  // Add more tests as needed for different functionality and interactions
});