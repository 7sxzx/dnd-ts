import React from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import { RouteComponentProps } from 'react-router-dom'

import { ICharacter } from '../interfaces'

const Character = ({ match, history }: RouteComponentProps<IProps>) => {
  const { id: characterID } = match.params
  const { loading, data } = useQuery<IQueryData, IQueryVariables>(
    CHARACTER_QUERY,
    {
      variables: {
        ID: characterID,
      },
    }
  )
  const [deleteCharacter] = useMutation<{}, IMutationVariables>(
    DELETE_CHARACTER,
    {
      onCompleted: () => history.push('/characters'),
      variables: { ID: characterID },
    }
  )

  if (loading) {
    return <p>loading...</p>
  }

  return (
    <div>
      <h1>{data.character.name}</h1>
      <h2>
        {data.character.subrace
          ? data.character.subrace.name
          : data.character.race.name}
      </h2>
      <button onClick={() => deleteCharacter()}>Delete</button>
    </div>
  )
}

interface IProps {
  id: string
}

interface IQueryData {
  character: ICharacter
}

interface IQueryVariables {
  ID: string
}

interface IMutationVariables {
  ID: string
}

const CHARACTER_QUERY = gql`
  query CharacterQuery($ID: ID!) {
    character(ID: $ID) {
      ID
      name
      race {
        ID
        name
      }
      subrace {
        ID
        name
      }
    }
  }
`

const DELETE_CHARACTER = gql`
  mutation DeleteCharacter($ID: ID!) {
    deleteCharacter(ID: $ID)
  }
`

export default Character
