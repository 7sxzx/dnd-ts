import React from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { useCharacter } from '../../context'

const SubmitCharacter = () => {
  const [submitCharacter, { data, error, loading }] = useMutation(
    SUBMIT_CHARACTER
  )
  const {
    character: {
      name,
      abilityScores,
      race: { ID: raceID },
      subrace: { ID: subraceID = null },
      charClass: { ID: charClassID },
      background: { ID: backgroundID },
    },
  } = useCharacter()

  if (loading) {
    return <h1>Loading . . .</h1>
  }
  if (error) {
    return <p>Error: {JSON.stringify(error)}</p>
  }

  return (
    <div>
      <button
        onClick={() =>
          submitCharacter({
            variables: {
              name,
              raceID,
              subraceID,
              charClassID,
              backgroundID,
              abilityScores,
            },
          })
        }
      >
        Submit
      </button>
      {data && (
        <div>
          <h1>{JSON.stringify(data)}</h1>
          <h2>{data.createCharacter.ID}</h2>
        </div>
      )}
    </div>
  )
}

const SUBMIT_CHARACTER = gql`
  mutation SubmitCharacter(
    $name: String!
    $raceID: ID!
    $subraceID: ID
    $charClassID: ID!
    $backgroundID: ID!
    $abilityScores: AbilityScoresInput
  ) {
    createCharacter(
      name: $name
      raceID: $raceID
      subraceID: $subraceID
      charClassID: $charClassID
      backgroundID: $backgroundID
      abilityScores: $abilityScores
    ) {
      ID
      name
      charClass {
        ID
        name
      }
      background {
        ID
        name
      }
    }
  }
`

export default SubmitCharacter
