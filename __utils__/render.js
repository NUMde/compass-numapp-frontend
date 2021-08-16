import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { buildStore } from './mockStore'

let store = null
 
export function renderWithRedux(subComponent, state) {

    if(!store) {
        state = state || {}
        store = buildStore(state)
    }

    const queries = render(<Provider store={store}>{subComponent}</Provider>)
    
    return {
        ...queries,
        store,
    }
}

export function initRenderModule(initialState) {

    initialState = initialState || {}
    
    store = buildStore(initialState)

    return store
}