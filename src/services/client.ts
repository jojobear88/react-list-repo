import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}`,
    },
  };
});

const cache = new InMemoryCache({
  typePolicies: {
    GetRepositories: {
      keyFields: [], // <- this
      fields: {
        Repository: {
          // Don't cache separate results based on any of this field's arguments.
          keyArgs: false,

          // // Concatenate the incoming list items with the existing list items.
          // merge(existing = [], incoming) {
          //   return [...existing, ...incoming];
          // },
          read(existing) {
            return existing;
          },
          merge(existing, incoming) {
            let offset = 0;
            // Slicing is necessary because the existing data is immutable, and frozen in development.
            const merged = existing ? existing.slice(0) : [];
            for (let i = 0; i < incoming.length; ++i) {
              merged[offset + i] = incoming[i];
            }
            console.log("Existing", existing);
            console.log("Incoming", incoming);
            return merged;
          },
        },
      },
    },
  },
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache,
  connectToDevTools: true,
});
