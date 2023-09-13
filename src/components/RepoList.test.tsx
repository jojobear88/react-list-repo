import { render, screen, waitFor } from '@testing-library/react';
import { RepoList } from './RepoList';

test('Should be loading when fetching GraphQL data', () => {
  render(<RepoList />);
  const linkElement = screen.getByText('Loading');
  expect(linkElement).toBeInTheDocument();
});

test('Should return error if fetching GraphQL data failed', () => {
    render(<RepoList />);
    const linkElement = screen.getByText('Error has occurred');
    expect(linkElement).toBeInTheDocument();
});

test('Should return no data if fetching GraphQL data return 0 record', () => {
    render(<RepoList />);
    const linkElement = screen.getByText('No data');
    expect(linkElement).toBeInTheDocument();
});

test('Should display table if fetching GraphQL data success', async () => {
    render(<RepoList />);
    await waitFor(() => {
        expect(screen.queryByText(/No data/i)).not.toBeInTheDocument();
    });
    expect(screen.getAllByRole("row").length).toBeGreaterThan(0);
});

