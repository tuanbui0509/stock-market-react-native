import React from 'react'
import { Text } from 'react-native'


function RVText(props) {
    const { content, style } = props

    return (
        <Text {...props} style={[{ fontSize: 18 }, style]}>{content}</Text>
    )
}

export default RVText
