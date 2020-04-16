import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            return { ...state, currentLocation: action.payload }
        default:
            return state
    }
}

// Action functions will go here
const startRecording = dispatch => () => {

}

const stopRecording = dispatch => () => {

}

const addLocation = dispatch => (location) => {
    console.log("Hi there!")
    dispatch({ type: 'add_current_location', payload: location })
}




export const { Provider, Context } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation },
    {
        recording: false,
        locations: [],
        currentLocation: null
    }
)