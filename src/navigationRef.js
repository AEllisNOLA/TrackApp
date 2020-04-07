import { NavigationActions } from 'react-navigation'

let navigator;

// nav object argument is the actual navigation prop from React Navigation
export const setNavigator = nav => {
    navigator = nav
}

export const navigate = (routeName, params) => {
    navigator.dispatch(
        NavigationActions.navigate({ routeName, params })
    )
}