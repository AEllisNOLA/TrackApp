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