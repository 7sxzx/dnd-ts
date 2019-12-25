import React, { useState, useEffect } from 'react'

import { useCharacter } from '../context'
import CharacterTitles from '../components/CharacterTitles'
import determineEquipmentChoices from '../equipmentChoices'
import ActivityButton from '../components/ActivityButton'
import { IEquipment } from '../interfaces'
import { RouteComponentProps } from 'react-router-dom'

const EquipmentSelection: React.FC<RouteComponentProps> = ({ history }) => {
  const { character, setCharacter } = useCharacter()
  const [choices, setChoices] = useState([])
  const [form, setForm] = useState<{ [key: string]: IEquipment }>({})
  console.log(form)
  useEffect(() => {
    determineEquipmentChoices(character.charClass.name).then(setChoices)
  }, [])

  const onSubmit = () => {
    const weapons = Object.values(form)
      .filter((equipment) => equipment.tableName === 'Weapon')
      .map((weapon) => ({ ID: weapon.ID, quantity: weapon.quantity }))
    // const armor = Object.values(form).filter(
    //   (equipment) => equipment.tableName === 'Armor'
    //   .map((armor) => ({ ID: armor.ID, quantity: armor.quantity }))
    // )
    console.log('equipment', weapons)
    setCharacter({ ...character, startingEquipment: { weapons } })
    history.push('/create-character/submit')
  }

  const isFormValid = () => {
    const formWithIDs = Object.values(form).filter((equipment) => equipment.ID)
    return choices.length > 0 && formWithIDs.length === choices.length
  }

  isFormValid()

  return (
    <section>
      <CharacterTitles />
      {choices.length > 0 && (
        <form>
          {choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <h3>Choose one:</h3>
              {choice.map(
                (option: {
                  tableName: string
                  text: string
                  quantity: number
                  choices?: []
                }) => (
                  <div key={option.text}>
                    <input
                      type="radio"
                      id={option.text}
                      value={option.text}
                      name={choiceIndex.toString()}
                      onChange={() => {
                        setForm({
                          ...form,
                          [`choice${choiceIndex}`]: option,
                        })
                      }}
                      checked={
                        !form[`choice${choiceIndex}`]
                          ? false
                          : form[`choice${choiceIndex}`].text === option.text
                      }
                    />
                    <label htmlFor={option.text}>{option.text}</label>
                    {option.choices &&
                      form[`choice${choiceIndex}`] &&
                      form[`choice${choiceIndex}`].text === option.text && (
                        <select
                          defaultValue=""
                          onChange={(
                            event: React.ChangeEvent<HTMLSelectElement>
                          ) =>
                            setForm({
                              ...form,
                              [`choice${choiceIndex}`]: {
                                ...form[`choice${choiceIndex}`],
                                ID: event.target.value,
                              },
                            })
                          }
                        >
                          <option value="" disabled>
                            ---
                          </option>
                          {option.choices.map(
                            (optionChoice: { ID: string; name: string }) => (
                              <option
                                key={optionChoice.ID}
                                value={optionChoice.ID}
                              >
                                {optionChoice.name}
                              </option>
                            )
                          )}
                        </select>
                      )}
                  </div>
                )
              )}
            </div>
          ))}
          <ActivityButton disabled={!isFormValid()} handleClick={onSubmit}>
            Submit
          </ActivityButton>
        </form>
      )}
    </section>
  )
}

export default EquipmentSelection
