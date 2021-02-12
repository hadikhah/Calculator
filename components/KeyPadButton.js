import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { styles } from '../styles'
import { buttonPressHandler } from '../logic'

export default KeyPadButton = ({ lableArray, input, setInput }) => {
    return (
        lableArray.map((lable, index) => {
            return (

                <TouchableOpacity key={index}
                    style={styles.button}
                    onPress={() => buttonPressHandler(lable, input, setInput)}
                >
                    <Text
                        style={styles.buttonLable}
                    >
                        {lable}
                    </Text>
                </TouchableOpacity>
            )
        })
    )
}

