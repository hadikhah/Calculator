import React from 'react'
import { View } from 'react-native'
import { styles } from '../styles'
import KeyPadButton from './KeyPadButton'

export default KeyPadProvider = ({ keys, buttonPressHandler, input, setInput }) => {
    return (
        keys.map((lableArray, index) => {
            return (

                <View style={styles.row} key={index}>
                    <KeyPadButton
                        input={input}
                        setInput={setInput}
                        lableArray={lableArray}
                    // buttonPressHandler={buttonPressHandler}
                    />
                </View>
            )
        })
    )
}

