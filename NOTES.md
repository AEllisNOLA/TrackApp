## 1. Setting Up More Complicated Navigation

1) First, install necessary dependencies.

    - `npm install react-navigation` 
    - `expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view` 
    - `npm install react-navigation-stack @react-native-community/masked-view` 
    - `npm install react-navigation-tabs` 
    - Start the app with `npm start -c` 

2) Create a skeleton of all the screens and import them into *app.js*.

3) Diagram how you want the navigation to work. For this project: 

    - *SignupScreen* and *SigninScreen* go back and forth using *StackNavigator*
    - *TrackListScreen* and *TrackDetailsScreen* go back and forth using *StackNavigator*
    - A *BottomTabNavigator* allows access to *TrackListScreen*, *TrackCreateScreen* and *AccountScreen*
    - A *SwitchNavigator* encompasses the entire app, starting with authentication and moving into the app. This is where we should start since it touches everything.

4) Complex navigation involves a series of nested objects.

`

const switchNavigator = createSwitchNavigator({

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

`

5) Remember to `export default createAppContainer(switchNavigator)` at the end of the file.

6) Move into each screen and create the navigation processes there by adding buttons and using the *navigation* prop.

## 2. Some Quick Styling

1) `npm install react-native-elements` for some customizable, pre-styled elements to save time on prototyping. Their documentation has all sorts of ways to customize their look.

## 3. Adding Context

1) Since this app will have multiple contexts, start off by creating the context creator helper function. Add a *Context* folder and create *createDataContext.js* within it.

`

import React, { createContext, useReducer } from 'react'

// Function for making new Contexts on the fly

export default (reducer, actions, defaultValue) => {

    const Context = createContext()

    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultValue)

        // loop over all actions in actions object and call them with dispatch
        const boundActions = {}
        for (let key in actions) {
            boundActions[key] = actions[key](dispatch)
        }

        return (
            // share state, actions with all children
            <Context.Provider value={{ state, ...boundActions }}>{children}</Context.Provider>
        )
    }

    return { Context, Provider }

}

`

2) In the same *Context* folder, create *AuthContext.js*. Require *createDataContext.js* created in step 1. Hold off on creating any *action functions* for now. Also of note, for now the *state* will include an *isSignedIn* flag, but that will change soon.

`
import createDataContext from './createDataContext'

const authReducer = (state, action) => {

    switch (action.type) {
        default:
            return state
    }

}

// Action Functions will go here

export const { Provider, Context } = createDataContext(

    authReducer,
    {},
    { isSignedIn: false }

)
`

3) Now to hook up *AuthReducer.js* so that everything can get data from it. Move into *App.js* and import the *AuthContext.js* as: `import { Provider as AuthProvider } from './src/context/AuthContext'` 

4) Rather than the previous `export default createAppContainer(switchNavigator)` , assign `createAppContainer(switchNavigator)` to a variable. Then export a function that creates a custom component and returns JSX.

`
// createAppContainer takess the overarching navigator object and creates a component out of it.
const App = createAppContainer(switchNavigator)

// Sandwich App within AuthProvider so that everything gets access
export default () => {
  return (

    <AuthProvider>
      <App />
    </AuthProvider>

  )
}
`

