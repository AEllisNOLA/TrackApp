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

## 4. Axios/Server Setup

1) Now that we need to reach out to our database, `npm install axios` . In *src*, make a new folder called *api* and a file to create/configure an instance of *axios* where the baseUrl is our *NGROK* forwarding address.

`
import axios from 'axios'

// baseURL only lasts 8 hours witn NGROK, so change often or errors will occur.
export default axios.create({

    baseURL: 'https://1072d022.ngrok.io/'

})
`

2) Steps to starting the server:

    - Open *trackapp-server* and run `npm run dev` 
    - In a second terminal within *trackapp-server*, run `npx ngrok http 3000` 
    - The prior command should give an 8-hour live URL. Place that in *api/trackApp.js* As a note, you can navigate to this page within a normal browser and should receive "error: You must be logged in." or something similar. That confirms the server is running.

## 5. Sign Up 

1) Import *trackApp.js* API into *AuthContext.js*.

2) To start, let's attempt just to get a response from the API. The beneath code will make a request to the api and console.log a token if success and an error if failure.

`
const signup = dispatch => {

    return async ({ email, password }) => {
        try {    
            const response = await trackAppAPI.post('/signup', { email, password })
            console.log(response.data)
        } catch (err) {
            console.log(err.message)
        }
    }

}
`

3) Export the above action function in the action object at the bottom of *AuthContext.js*.

3) Wire up the code in *SignupScreen.js*. Import the *useContext* hook from React, as well as the AuthContext with `import { Context as AuthContext } from '../context/AuthContext'` .

4) In the actual *SignupScreen* component, pull the *state* and the *signup* action function from off of the *AuthContext*. Give the submit button `onPress={() => signup({ email, password })}` 

5) In the app, try to sign up with a new e-mail address and an in-use email address. A token should be logged to the console for the former and an error code should show for the latter.

6) Now add error handling. One way to tackle this is to add an errorMessage state property. Add that new piece of state to the export line in *AuthContext.js*.

Then add `dispatch({ type: 'add_error', payload: 'Something went horribly wrong.'})` to the *catch* block within the *action function*.

Finally, in the *authReducer* function up top.add: 
`
case 'add_error':

    return {...state, errorMessage: action.payload}

` 

Now, within *SignupScreen.js*, that error message will be in the state and you can conditionally display it.

7) Similar to step 7, we can now create the success case. First, we will be storing the token to the device, so `import {AsyncStorage} from 'react-native'` .*Note:* A new version is coming out soon, so the library will be pulled from a different source in the future.

After the API request to sign up, save the JWT to the device, then dispatch it.
`
const response = await trackAppAPI.post('/signup', { email, password })
await AsyncStorage.setItem('token', response.data.token)
dispatch({ type: 'signup', payload: response.data.token })
`

Now that a token has been created, swap the `isSignedIn: false` state for `token: null` . The presence of a token means the user is logged in. Lastly, add the 'signup' case to the *authReducer* up top remembering to set the errorMessage back to null in case a priot signup attempt by the user failed: `return { errorMessage: '', token: action.payload }` 

 ## 6. Navigation from Outside of React
 Navigation with React components is pretty simple. Every components wrapped in a navigator has access to the *navigation* prop. But components not rendered by a navigator do not have access to that prop. Accessing that prop from outside a navigator - such as would be the case needed to navigate within an action function - is more difficult.

 The best way to deal with this is to make a navigation reference file and export a function which will get access to the navigator and can be used anywhere.

 1) Create *navigationRef.js* in the *src* directory. Add the following:

 `
 let navigator; 

// nav object argument is the actual navigation prop from React Navigation
export const setNavigator = nav => {

    navigator = nav

}
 `

2) Import the function in *App.js*. In the export at the bottom, add a ref prop to <App />. The `<App ref={navigator => {setNavigator(navigator)} />` . Essentially, this hooks into the component where the *navigation* prop is accessable and assigns it to the navigator variable in the helper function. It is now accessible in *navigationRef.js*

3) Now a function can be written and exported that will grant navigation accessibility wherever it is needed.

React Navigation's Navigator internally functions like Context. So we can dispatch an action to tell React Navigation to change its state and show a different screen.

`
export const navigate = (routeName, params) => {

    navigator.dispatch(
        NavigationActions.navigate({ routeName, params })
    )

}
`

4) Whenever you need to navigate somewhere from outside of React, `import { navigate } from '../navigationRef'` where it is needed, then call something like `navigate('trackList')` .

## 7. Reusable Component Refactoring

This is all pretty self-explanatory. Just one note: when a reusable component is going to be displayed by a screen within the navigation, you need to `import {withNavigation} from 'react-navigation'` . Components directly by a *navigator* (in *App.js* file) are rendered directly by *React Navigation*, so each has a *navigation* prop. Child components displayed need to either pass props from the Screen component to the child, or the component should be wrapped in a `withNavigation()` function so it can have access to the *navigation* prop. So a reusable child that depends on navigation would be exported like so: `export default withNavigation(NavLink)` 

## 8. Navigation Events

There are times you will want to performing an action on navigating, such as clearing an error message.

1) `import {NavigationEvents} from 'react-navigation'` 
2) Use <NavigationEvents /> within the component's return statement. It does not display anything on the screen. Instead, you can pass it one of a few different callbacks as a prop, and it will run whenever the desired action is taken.

* onWillFocus - called when you are about to navigate to the current screen.
* onDidFocus - called upon successful navigation to the current screen.
* onWillBlur -  called when you are about to navigate away from the current screen.
* onDidBlur - called upon successful navigation away from the current screen.

3) For this instance of clearing the error message, the component would like like:
`
<NavigationEvents 

    onWillBlur={clearErrorMessage} 
    onWillFocus={clearErrorMessage} />

`

*NOTE*: React Navigation V5's upgrade may work a little better, so look into using that in the future. V4 can be buggy.

* Another useful feature of ReactNavigation is *SafeAreaView*. It is anotherway to add margin to the top to keep items from being way too high up. There are also other props you can add to customize the arrangement.

`
return (
        <SafeAreaView forceInset={{ top: 'always' }}>
            <Text style={{ fontSize: 48 }}>AccountScreen</Text>
        </SafeAreaView>
    )
`



