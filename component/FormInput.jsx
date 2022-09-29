import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'
import { windowHeight } from '../utils/Dimention'
import AntDesign from 'react-native-vector-icons/AntDesign';

const FormInput = ({ labelValue, placeholderText, iconType, ...rest }) => {
  return (
    <View style={styles.inputContainer}>
       <View style={styles.iconStyle}>
           <AntDesign name={ iconType } size={25} color="#555" />
       </View>
       <TextInput 
          Value={labelValue}
          numberOfLines={1}
          placeholder={placeholderText}
          placeholderTextColor="#999"
          {...rest}
          style={styles.input}
       />   
    </View>
  )
}

export default FormInput

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 10,
        width: '100%',
        height: windowHeight / 15,
        borderColor: '#bbb',
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    iconStyle: {
        padding: 10,
        height: '100%',
        justifyContent:'center',
        alignItems:'center',
        borderRightColor: '#bbb',
        borderRightWidth:1,
        width: 50
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: '#333',
        justifyContent:'center',
        alignItems:'center'
    }

})