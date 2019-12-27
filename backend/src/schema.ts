import { gql } from 'apollo-server'

const typeDefs = gql`
  type Mutation {
    createCharacter(
      name: String!
      raceID: ID!
      subraceID: ID
      charClassID: ID!
      backgroundID: ID!
      abilityScores: AbilityScoresInput!
      skills: [ID]!
      weapons: [WeaponInput]!
    ): ID!
    deleteCharacter(ID: ID!): Int
  }

  type Query {
    spells: [Spell]!
    spell(ID: ID!): Spell
    characters: [Character]!
    character(ID: ID!): Character
    races: [Race]!
    race(ID: ID!): Race
    raceTraits(raceID: ID!): [RaceTrait]!
    backgrounds: [Background]!
    background(ID: ID!): Background
    charClasses: [CharClass]!
    charClass(ID: ID!): CharClass
    skills: [Skill]!
    weapons(filter: WeaponFilter): [Weapon]!
  }

  type Spell {
    ID: ID!
    name: String!
  }

  type Character {
    ID: ID!
    name: String!
    race: Race!
    subrace: Subrace
    charClass: CharClass!
    background: Background!
    abilityScores: AbilityScores!
    skills: [Skill]!
    weapons: [CharWeapon]!
    HP: String
    maxHP: String
  }

  type Race {
    ID: ID!
    name: String!
    subraces: [Subrace]
    traits: [RaceTrait]!
    skills: [Skill]
  }

  type Subrace {
    ID: ID!
    name: String!
    traits: [RaceTrait]!
  }

  type RaceTrait {
    ID: ID!
    name: String!
    description: String!
  }

  type Background {
    ID: ID!
    name: String!
    features: [BackgroundFeature]!
    skills: [Skill]
  }

  type BackgroundFeature {
    ID: ID!
    name: String!
    description: String!
  }

  type CharClassFeature {
    ID: ID!
    name: String!
    description: String!
    level: Int!
  }

  type CharClass {
    ID: ID!
    name: String!
    hitDice: String
    numSkillProficiencies: Int!
    features: [CharClassFeature]!
    skills: [Skill]
  }

  type AbilityScores {
    str: Int!
    dex: Int!
    con: Int!
    int: Int!
    wis: Int!
    cha: Int!
  }

  input AbilityScoresInput {
    str: Int!
    dex: Int!
    con: Int!
    int: Int!
    wis: Int!
    cha: Int!
  }

  type Skill {
    ID: ID!
    name: String!
    ability: String!
  }

  """
  CharWeapon is identical to weapon except that it needs 'quantity'
  to be bound to a character.
  """
  type CharWeapon {
    ID: ID!
    name: String!
    damage: String!
    cost: String!
    weight: String
    skillType: String!
    rangeType: String!
    quantity: Int!
  }

  type Weapon {
    ID: ID!
    name: String!
    damage: String!
    cost: String!
    weight: String
    skillType: String!
    rangeType: String!
  }

  input WeaponFilter {
    skillType: String
    rangeType: String
  }

  input WeaponInput {
    ID: ID!
    quantity: Int
  }
`

export default typeDefs
