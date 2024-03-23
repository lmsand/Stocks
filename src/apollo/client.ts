import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";


const client = new ApolloClient({
  uri: 'https://maguing.stepzen.net/api/wobbly-raccoon/__graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization: 'Apikey maguing::stepzen.net+1000::5f69116a22b5ba34f53f20ce126e75ef620da6596c20a3dfde6f9f2abe716cd1'
  }
});

export default client
