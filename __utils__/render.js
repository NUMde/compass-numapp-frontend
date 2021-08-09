import React from 'react'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react-native'
import { buildStore } from './mockStore'
 
export function renderWithRedux(subComponent, state) {
    
    state = state || {}
    const store = buildStore(state)
    
    const queries = render(<Provider store={store}>{subComponent}</Provider>)
    
    return {
        ...queries,
        store,
    }
}