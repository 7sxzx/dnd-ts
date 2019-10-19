const resolvers = {
  Mutation: {
    createCharacter: (
      _: any,
      {
        name,
        raceID,
        subraceID,
      }: { name: string; raceID: string; subraceID: string },
      { dataSources }: any
    ) => dataSources.characterAPI.createCharacter({ name, raceID, subraceID }),
    deleteCharacter: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.characterAPI.deleteCharacter({ ID }),
  },

  Query: {
    characters: (_: any, __: any, { dataSources }: any) =>
      dataSources.characterAPI.getCharacters(),
    character: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.characterAPI.getCharacter({ ID }),
    races: (_: any, __: any, { dataSources }: any) =>
      dataSources.raceAPI.getRaces(),
    race: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.raceAPI.getRace({ ID }),
    raceTraits: (
      _: any,
      { raceID }: { raceID: string },
      { dataSources }: any
    ) => dataSources.raceAPI.getRaceTraits({ raceID }),
    spells: (_: any, __: any, { dataSources }: any) =>
      dataSources.spellAPI.getSpells(),
    spell: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.spellAPI.getSpell({ ID }),
    backgrounds: (_: any, __: any, { dataSources }: any) =>
      dataSources.backgroundAPI.getBackgrounds(),
    background: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.backgroundAPI.getBackground({ ID }),
    charClasses: (_: any, __: any, { dataSources }: any) =>
      dataSources.charClassAPI.getCharClasses(),
    charClass: (_: any, { ID }: { ID: string }, { dataSources }: any) =>
      dataSources.charClassAPI.getCharClass({ ID }),
  },

  CharClass: {
    features: (CharClass: ICharClass, _: any, { dataSources }: any) =>
      dataSources.charClassAPI.getFeatures({ ID: CharClass.ID }),
  },

  Character: {
    race: (Character: ICharacter, _: any, { dataSources }: any) =>
      dataSources.characterAPI.getCharacterRace({ ID: Character.ID }),
    subrace: (Character: ICharacter, _: any, { dataSources }: any) =>
      dataSources.characterAPI.getCharacterSubrace({ ID: Character.ID }),
  },

  Race: {
    subraces: (Race: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getSubraces({ ID: Race.ID }),
    traits: (Race: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getRaceTraits({ raceID: Race.ID }),
  },

  Subrace: {
    traits: (Subrace: IRace, _: any, { dataSources }: any) =>
      dataSources.raceAPI.getRaceTraits({ raceID: Subrace.ID }),
  },

  Background: {
    features: (Background: IBackground, _: any, { dataSources }: any) =>
      dataSources.backgroundAPI.getFeatures({ backgroundID: Background.ID }),
  },
}

interface ICharClass {
  ID: number
  name: string
}

interface ICharacter {
  ID: number
  name: string
}

interface IRace {
  ID: number
  name: string
  parentRaceID: number | null
}

interface IBackground {
  ID: number
  name: string
}

export default resolvers
