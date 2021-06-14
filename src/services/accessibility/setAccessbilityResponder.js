
// (C) Copyright IBM Deutschland GmbH 2020.  All rights reserved.

/***********************************************************************************************
import
***********************************************************************************************/

import { AccessibilityInfo, findNodeHandle, Platform, UIManager} from 'react-native'

/***********************************************************************************************
export
***********************************************************************************************/

export default function setAccessibilityResponder(object) {   
    if (object && object.current) {
        const temp = findNodeHandle(object.current)
        if (temp) {
            Platform.OS === 'android'
                ? UIManager.sendAccessibilityEvent(temp, 8)
                : AccessibilityInfo.setAccessibilityFocus(temp)
            return true
        }
    }
    return false
}