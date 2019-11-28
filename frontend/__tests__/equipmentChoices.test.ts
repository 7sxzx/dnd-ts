import determineEquipmentChoices from '../src/equipmentChoices'

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

jest.mock('../src/apolloClient', () => ({
  query: () => Promise.resolve(mockMartialMeleeWeapons),
}))

const expected = [
  [
    // Option 1
    {
      text: 'Greataxe',
      amount: 1,
    },
    // Option 2 (select)
    {
      text: 'Any Martial Melee Weapon',
      choices: mockMartialMeleeWeapons.data.weapons,
      amount: 1,
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
