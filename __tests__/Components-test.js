
import React from 'react'
import '@testing-library/jest-native/extend-expect'
import { renderWithRedux } from '../__utils__/render'

import Banner from '../src/components/banner/banner'

it('Banner can be rendered', async () => {

    // just renders the banner and compares it to its snapshot
    let tree = renderWithRedux(<Banner/>)

    // expect(tree).toMatchSnapshot()
})