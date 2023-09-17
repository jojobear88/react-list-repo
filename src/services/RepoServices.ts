import { useLazyQuery } from "@apollo/client";
import { GET_REPOSITORIES, SEARCH_REPOSITORIES } from "./RepoQuery";

const LIMIT_RECORDS = 10;

export function useReposQuery(username: string, after: string | null) {
  const result = useLazyQuery(GET_REPOSITORIES, {
    variables: {
      limit: LIMIT_RECORDS,
      loginUser: username,
      after: after,
    },
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
