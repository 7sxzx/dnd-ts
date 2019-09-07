import { ApolloServer } from 'apollo-server'
import CharacterAPI from './datasources/character'
import CharClassAPI from './datasources/charClass'
import RaceAPI from './datasources/race'
import SpellAPI from './datasources/spell'
import resolvers from './resolvers'
import typeDefs from './schema'

const server = new ApolloServer({
  resolvers,
  typeDefs,
  dataSources: () => ({
    charClassAPI: new CharClassAPI(),
    characterAPI: new CharacterAPI(),
    raceAPI: new RaceAPI(),
    spellAPI: new SpellAPI(),
  }),
})

server.listen().then(({ url }) => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at ${url}`)
})
