import createDataContext from './createDataContext'

const authReducer = (state, action) => {
    switch (action.type) {
        default:
            return state
    }
}

// Action functions will go here

export const { Provider, Context } = createDataContext(
    authReducer,
    {},
    { isSignedIn: false }
)