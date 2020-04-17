import createDataContext from './createDataContext'

const locationReducer = (state, action) => {
    switch (action.type) {
        case 'add_current_location':
            return { ...state, currentLocation: action.payload }
        case 'start_recording':
            return { ...state, isRecording: true }
        case 'stop_recording':
            return { ...state, isRecording: false }
        case 'add_location':
            return { ...state, locations: [...state.locations, action.payload] }
        case 'change_name':
            return { ...state, name: action.payload }
        default:
            return state
    }
}

// Action functions will go here
const startRecording = dispatch => () => {
    dispatch({ type: 'start_recording' })
}

const stopRecording = dispatch => () => {
    dispatch({ type: 'stop_recording' })
}

const addLocation = dispatch => (location, isRecording) => {
    dispatch({ type: 'add_current_location', payload: location })

    if (isRecording) {
        dispatch({ type: 'add_location', payload: location })
    }
}

const changeName = dispatch => (name) => {
    dispatch({ type: 'change_name', payload: name })
}




export const { Provider, Context } = createDataContext(
    locationReducer,
    { startRecording, stopRecording, addLocation, changeName },
    {
        name: '',
        isRecording: false,
        locations: [],
        currentLocation: null
    }
)