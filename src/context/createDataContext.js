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
