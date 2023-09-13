import React from "react";
import { render, screen } from "@testing-library/react";
import { RepoList } from "./RepoList";

// Mock the useReposQuery hook
jest.mock("../services/RepoServices", () => ({
  useReposQuery: jest.fn(),
}));

describe("RepoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders loading state when data is being fetched", () => {
    jest.fn().mockReturnValue({ loading: true });

    render(<RepoList />);

    expect(screen.getByText("Loading ...")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("renders error state when an error occurs", () => {
    jest.fn().mockReturnValue({ error: true });

    render(<RepoList />);

    expect(screen.getByText("Error has occurred ...")).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("renders table with data when data is available", () => {
    const data = [{ name: "Repo 1" }, { name: "Repo 2" }];
    jest.fn().mockReturnValue({ data });

    render(<RepoList />);

    expect(screen.queryByText("Loading ...")).not.toBeInTheDocument();
    expect(screen.queryByText("Error has occurred ...")).not.toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("table")).toHaveAttribute("data-source", JSON.stringify(data));
  });

  it("renders correct table columns", () => {
    render(<RepoList />);

    const tableColumns = screen.getAllByRole("columnheader");

    expect(tableColumns).toHaveLength(5);

    expect(tableColumns[0]).toHaveTextContent("Name");
    expect(tableColumns[1]).toHaveTextContent("Projects Resource Path");
    expect(tableColumns[2]).toHaveTextContent("Description");
    expect(tableColumns[3]).toHaveTextContent("Stars");
    expect(tableColumns[4]).toHaveTextContent("Forks");
  });

  // Add additional tests for custom component rendering, column alignment, etc.
});