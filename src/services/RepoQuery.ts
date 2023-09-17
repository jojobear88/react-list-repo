import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql(/* graphql */ `
query GetRepositories($limit: Int!, $loginUser: String!, $after: String) {
  user(login: $loginUser) {
    id
    repositories(first: $limit, after: $after) {
      totalCount
      nodes {
        key: id
        id
        name
        url
        description
        forkCount
        stargazerCount
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
}
`);

export const SEARCH_REPOSITORIES = gql(/* graphql */ `
query SearchRepos($query: String!, $limit: Int!, $after: String) {
  search(query: $query, type: REPOSITORY, first: $limit, after: $after) {
    repositoryCount
    pageInfo {
      endCursor
      hasNextPage
    }
    edges {
      node {
        ... on Repository {
          id
          name
          url
          description
          forkCount
          stargazerCount
        }
      }
    }
  }
}
`);
