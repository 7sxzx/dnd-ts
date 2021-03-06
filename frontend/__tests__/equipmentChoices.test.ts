import { determineEquipmentChoices } from '../src/utils/equipmentChoices'

const mockMartialMeleeWeapons = {
  data: {
    weapons: [
      {
        ID: '4',
        name: 'battleaxe',
      },
    ],
  },
}

const mockSimpleWeapons = {
  data: {
    weapons: [
      {
        ID: '1',
        name: 'dagger',
      },
    ],
  },
}

jest.mock('../src/apolloClient', () => ({
  query: ({ variables }: { variables: { skillType: string } }) => {
    if (variables.skillType === 'simple') {
      return Promise.resolve(mockSimpleWeapons)
    }

    if (variables.skillType === 'martial') {
      return Promise.resolve(mockMartialMeleeWeapons)
    }
  },
}))

const expected = [
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
      choices: mockMartialMeleeWeapons.data.weapons,
      quantity: 1,
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
      choices: mockSimpleWeapons.data.weapons,
    },
  ],
]

describe('determineEquipmentChoices', () => {
  it('should return choices, given a character class', async () => {
    const barbarianEquipmentChoices = await determineEquipmentChoices(
      'barbarian'
    )

    expect(barbarianEquipmentChoices).toEqual(expect.arrayContaining(expected))
  })
})
