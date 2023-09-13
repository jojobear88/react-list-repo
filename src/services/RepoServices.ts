import { gql, useQuery } from "@apollo/client";

const LIMIT_RECORDS = 50;

const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories($limit: Int!, $loginUser: String!) {
    user(login: $loginUser) {
      repositories(first: $limit) {
        nodes {
          key: id
          name
          url
          description
          forkCount
          stargazerCount
        }
      }
    }
  }
`);

export function useReposQuery() {
  return useQuery(GET_REPOSITORIES, {
    variables: {
      limit: LIMIT_RECORDS,
      loginUser: process.env.REACT_APP_LOGIN_USER,
    },
  });
}
