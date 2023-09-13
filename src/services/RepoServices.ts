import { gql, useQuery } from "@apollo/client";

const LIMIT_RECORDS = 10;

const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories($limit: Int!, $loginUser: String!, $after: String) {
    user(login: $loginUser) {
      repositories(first: $limit, after: $after) {
        totalCount
        nodes {
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

export function useReposQuery(after: string | null) {
  return useQuery(GET_REPOSITORIES, {
    variables: {
      limit: LIMIT_RECORDS,
      loginUser: process.env.REACT_APP_LOGIN_USER,
      after: after,
    },
  });
}
