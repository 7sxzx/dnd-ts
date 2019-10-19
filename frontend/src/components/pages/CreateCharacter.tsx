import React, { createContext, useContext, useState } from 'react'
import { Route, RouteComponentProps } from 'react-router-dom'
import CharacterProvider from '../../context'
import BackgroundSelection from './BackgroundSelection'
import ClassSelection from './ClassSelection'
import RaceSelection from './RaceSelection'
import StatSelection from './StatSelection'
import SubmitCharacter from './SubmitCharacter'

const CreateCharacter = () => {
  return (
    <CharacterProvider>
      <Route exact path="/create-character" component={RaceSelection} />
      <Route exact path="/create-character/class" component={ClassSelection} />
      <Route
        exact
        path="/create-character/background"
        component={BackgroundSelection}
      />
      <Route exact path="/create-character/stats" component={StatSelection} />
      <Route
        exact
        path="/create-character/submit"
        component={SubmitCharacter}
      />
    </CharacterProvider>
  )
}

export default CreateCharacter
