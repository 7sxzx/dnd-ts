import { gql } from 'apollo-boost'
import client from '../apolloClient'
import logger from './logger'

export const defaultEquipment: { [key: string]: any[] } = {
  barbarian: [
    {
      ID: '170',
      tableName: 'Weapon',
      text: '4x javelins',
      quantity: 4,
    },
  ],
}

export const defaultGearPack: {
  [key: string]: { ID: string; tableName: string; text: string }
} = {
  barbarian: {
    ID: '5',
    tableName: 'GearPack',
    text: "an explorer's pack",
  },
}

/**
 * Used for the first level equipment choices step in creating a character.
 * The GraphQL server will be hit for the various equipment types and a large
 * map (with each class as a key) will be used to look up the appropriate questions and options.
 * @param {string} charClassName  - The character class to look up
 */
export async function determineEquipmentChoices(
  charClassName: string
): Promise<any> {
  const allMartialMeleeWeapons = await getWeapons('martial', 'melee')
  const allSimpleWeapons = await getWeapons('simple')

  const equipmentChoices: { [key: string]: any[] } = {
    barbarian: [
      // choose one
      [
        // Option 1
        {
          ID: '177',
          tableName: 'Weapon',
          text: 'a greataxe',
          quantity: 1,
        },
        // Option 2 (select)
        {
          tableName: 'Weapon',
          text: 'any martial melee weapon',
          quantity: 1,
          choices: allMartialMeleeWeapons,
        },
      ],
      [
        {
          ID: '169',
          tableName: 'Weapon',
          text: 'two handaxes',
          quantity: 2,
        },
        {
          tableName: 'Weapon',
          text: 'any simple weapon',
          quantity: 1,
          choices: allSimpleWeapons,
        },
      ],
    ],
    bard: [
      // choose one
      [
        // Option 1
        {
          tableName: 'Weapon',
          text: 'a rapier',
          quantity: 1,
        },
        // Option 2
        {
          tableName: 'Weapon',
          text: 'any simple weapon',
          quantity: 1,
          choices: allSimpleWeapons,
        },
      ],
    ],
  }

  return equipmentChoices[charClassName]
}

/**
 *  Gets all weapons from the GraphQL server, and allows 2 filter options to be passed.
 * @param {string} skillType - "simple" or "martial"
 * @param {string} rangeType - "melee" or "ranged"
 */
async function getWeapons(
  skillType?: 'simple' | 'martial',
  rangeType?: 'melee' | 'ranged'
) {
  try {
    const {
      data: { weapons },
    } = await client.query({
      variables: {
        skillType,
        rangeType,
      },
      query: gql`
        query allWeaponsFiltered($skillType: String, $rangeType: String) {
          weapons(filter: { skillType: $skillType, rangeType: $rangeType }) {
            ID
            name
          }
        }
      `,
    })

    return weapons
  } catch (error) {
    logger('allWeaponsFiltered query returned an error', error)
  }
}
