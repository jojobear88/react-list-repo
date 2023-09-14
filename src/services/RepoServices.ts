import { gql, useLazyQuery, useQuery } from "@apollo/client";

const LIMIT_RECORDS = 10;

const GET_REPOSITORIES = gql(/* graphql */ `
query GetRepositories($limit: Int!, $loginUser: String!, $after: String) {
  user(login: $loginUser) {
    id
    repositories(first: $limit, after: $after) {
      __typename
      totalCount
      nodes {
        __typename
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

const SEARCH_REPOSITORIES = gql(/* graphql */ `
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

export function useReposQuery(after: string | null) {
  const result = useQuery(GET_REPOSITORIES, {
    variables: {
      limit: LIMIT_RECORDS,
      loginUser: process.env.REACT_APP_LOGIN_USER,
      after: after,
    },
    fetchPolicy: "cache-first",
  });

  return result;
}

export function useSearchReposQuery(query: string, after: string | null) {
  const result = useLazyQuery(SEARCH_REPOSITORIES, {
    variables: {
      query: query,
      limit: LIMIT_RECORDS,
      after: after,
    },
    fetchPolicy: "cache-first",
  });

  return result;
}
