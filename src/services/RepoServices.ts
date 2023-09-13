import { gql, useQuery } from "@apollo/client";
import { Repository } from "../types/Repository";

const LIMIT_RECORDS = 50;

const GET_REPOSITORIES = gql(/* GraphQL */ `
  query GetRepositories($limit: Int!, $loginUser: String!) {
    user(login: $loginUser) {
      repositories(first: $limit) {
        nodes {
          key: id
          description
          forkCount
          stargazerCount
          projectsUrl
          url
          name
        }
      }
    }
  }
`);

export function useReposQuery() {
  return useQuery<Repository[]>(GET_REPOSITORIES, {
    variables: {
      limit: LIMIT_RECORDS,
      loginUser: process.env.REACT_APP_LOGIN_USER,
    },
  });
}
