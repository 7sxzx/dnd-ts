// tslint:disable: no-console
import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'

import schema from '../schema.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: schema,
})
const cache = new InMemoryCache({ fragmentMatcher })

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        })
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    }),
    new HttpLink({ uri: 'http://localhost:4000', credentials: 'same-origin' }),
  ]),
  cache,
})

export default client
