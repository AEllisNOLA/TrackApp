import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AccountScreen from './src/screens/AccountScreen'
import ResolveAuthScreen from './src/screens/ResolveAuthScreen'
import SigninScreen from './src/screens/SigninScreen'
import SignupScreen from './src/screens/SignupScreen'
import TrackCreateScreen from './src/screens/TrackCreateScreen'
import TrackListScreen from './src/screens/TrackListScreen'
import TrackDetailScreen from './src/screens/TrackDetailScreen'

import { Provider as AuthProvider } from './src/context/AuthContext'
import { setNavigator } from './src/navigationRef'

const switchNavigator = createSwitchNavigator({
  ResolveAuth: ResolveAuthScreen,

  // Login pages
  loginFlow: createStackNavigator({
    Signup: SignupScreen,
    Signin: SigninScreen
  }),
  // Main App pages - TrackList, Account and TrackCreate
  mainFlow: createBottomTabNavigator({
    // TrackList link, which includes flow to TrackDetail
    TrackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }),
    // TrackCreateScreen and AccountScreen to finish off the bottom nav
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen
  })
})

// createAppContainer takess the overarching navigator object and creates a component out of it.
const App = createAppContainer(switchNavigator)

// Sandwich App within AuthProvider so that everything gets access
export default () => {
  return (
    <AuthProvider>
      <App ref={navigator => {
        setNavigator(navigator)
      }} />
    </AuthProvider>
  )
}