import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackAppAPI from '../api/trackAppAPI'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signin':
            return { errorMessage: '', token: action.payload }
        case 'clear_error_message':
            return { ...state, errorMessage: '' }
        case 'signout':
            return { token: null, errorMessage: '' }
        default:
            return state
    }
}

// Action functions will go here
const clearErrorMessage = dispatch => () => {
    dispatch({ type: 'clear_error_message' })

}

const tryLocalSignin = dispatch => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
        dispatch({ type: 'signin', payload: token })
        navigate('TrackList')
    } else {
        navigate('loginFlow')
    }
}


const signup = dispatch => async ({ email, password }) => {
    try {
        // make API request to sign up
        const response = await trackAppAPI.post('/signup', { email, password })
        // Take JWT response from API and store it on the device
        await AsyncStorage.setItem('token', response.data.token)
        // Dispatch action putting token in state
        dispatch({ type: 'signin', payload: response.data.token })
        // Navigate user to 'trackList' section of app
        navigate('TrackList')
    } catch (err) {

        // Dispatch action to update state with error message. Remember to wire it up in SignupScreen
        dispatch({ type: 'add_error', payload: 'Something went horribly wrong. 1' })
    }
}


const signin = dispatch => async ({ email, password }) => {
    try {
        const response = await trackAppAPI.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ type: 'signin ', payload: response.data.token })
        navigate('TrackList')
    } catch (err) {
        dispatch({ type: 'add_error', payload: 'Something went horribly wrong. 2' })
    }

}

const signout = dispatch => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' })
    navigate('loginFlow')
}




export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearErrorMessage, tryLocalSignin },
    { token: null, errorMessage: '' }
)