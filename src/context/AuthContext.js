import { AsyncStorage } from 'react-native'
import createDataContext from './createDataContext'
import trackAppAPI from '../api/trackAppAPI'
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return { ...state, errorMessage: action.payload }
        case 'signup':
            return { errorMessage: '', token: action.payload }
        default:
            return state
    }
}

// Action functions will go here
const signup = dispatch => async ({ email, password }) => {
    try {
        // make API request to sign up
        const response = await trackAppAPI.post('/signup', { email, password })
        // Take JWT response from API and store it on the device
        await AsyncStorage.setItem('token', response.data.token)
        // Dispatch action putting token in state
        dispatch({ type: 'signup', payload: response.data.token })
        // Navigate user to 'trackList' section of app
        navigate('TrackList')
    } catch (err) {

        // Dispatch action to update state with error message. Remember to wire it up in SignupScreen
        dispatch({ type: 'add_error', payload: 'Something went horribly wrong.' })
    }
}


const signin = dispatch => ({ email, password }) => {

}

const signout = dispatch => () => {

}




export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout },
    { token: null, errorMessage: '' }
)