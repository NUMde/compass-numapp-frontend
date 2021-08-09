
import React from 'react'
import '@testing-library/jest-native/extend-expect'
import { renderWithRedux } from '../__utils__/render'

import Banner from '../src/components/banner/banner'

describe('SHARED COMPONENTS:', () => {
    
    test ('<Banner /> can be rendered', async () => {
    
        let tree = renderWithRedux(<Banner />)
    
        // expect(tree).toMatchSnapshot()
    })
})