import { ApolloError, gql } from 'apollo-boost'
import React from 'react'
import { Query } from 'react-apollo'

const Spells = ({ spellID }: IProps) => {
  return (
    <Query<IData, IVariables> query={SPELL_QUERY} variables={{ ID: spellID }}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>loading...</p>
        }
        if (error) {
          return <p>Error: {error}</p>
        }

        return <h1>{data.spell.name}</h1>
      }}
    </Query>
  )
}

interface IProps {
  spellID: number
}

const SPELL_QUERY = gql`
  query SpellQuery($ID: ID!) {
    spell(ID: $ID) {
      ID
      name
    }
  }
`

interface IData {
  spell: {
    ID: string
    name: string
  }
}

interface IVariables {
  ID: number
}

export default Spells
