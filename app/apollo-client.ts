import { ApolloClient, InMemoryCache, from, HttpLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Create the HTTP Link
const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql", // Replace with your GraphQL server URL
});

// Create the error link
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

// Combine the links
const link = from([errorLink, httpLink]);

export const client = new ApolloClient({
  link,
  uri: "http://localhost:3000/api/graphql", // Replace with your GraphQL server URL
  cache: new InMemoryCache(),
});