//..core..
import React, { useState } from 'react';
import { View, TextInput } from 'react-native';
//..installed..
import { LinearGradient } from 'expo-linear-gradient';
//..exiting..
import { styles } from './styles'
import KeyPadProvider from './components/KeyPadProvider'
//..start..
/**
 * 
 *  
 */
export default function App() {
  // const [history, setHistory] = useState('')
  const [input, setInput] = useState('0')
  const [keys] = useState([
    ['AC', 'Dell', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '00', '.', '='],
  ])

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#2196f3', '#e91e63']}
        style={styles.background}
      >
        <View style={styles.header} >
          <TextInput
            value={input}
            editable={false}
            // placeholder='helllo'
            multiline={true}
            style={styles.input}
          />
        </View>
        <View style={styles.body} >
          <KeyPadProvider
            input={input}
            setInput={setInput}
            keys={keys}
          />
        </View>
      </LinearGradient>
    </View>
  );
}
;
