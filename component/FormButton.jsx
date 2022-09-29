import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { windowHeight, windowWidth } from '../utils/Dimention'
import React from 'react'

const FormButton = ({ buttonTitle, backgroundColor, ...rest }) => {
  return (
    <TouchableOpacity style={[styles.buttonContainer, {backgroundColor}]} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  )
}

export default FormButton

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        width: '100%',
        height: windowHeight / 15,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'#fff'
    }
})