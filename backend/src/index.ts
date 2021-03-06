import { ApolloServer } from 'apollo-server'
import { importSchema } from 'graphql-import'
import CharacterAPI from './datasources/character'
import RaceAPI from './datasources/race'
import CharClassAPI from './datasources/charClass'
import BackgroundAPI from './datasources/background'
import SpellAPI from './datasources/spell'
import SkillAPI from './datasources/skill'
import ItemAPI from './datasources/item'
import resolvers from './resolvers'

const server = new ApolloServer({
  resolvers,
  typeDefs: importSchema(`${__dirname}/schema.graphql`),
  dataSources: () => ({
    backgroundAPI: new BackgroundAPI(),
    charClassAPI: new CharClassAPI(),
    characterAPI: new CharacterAPI(),
    raceAPI: new RaceAPI(),
    spellAPI: new SpellAPI(),
    skillAPI: new SkillAPI(),
    itemAPI: new ItemAPI(),
  }),
})

server.listen().then(({ url }: { url: string }) => {
  // tslint:disable-next-line: no-console
  console.log(`Server ready at ${url}`)
})
