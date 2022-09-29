import { View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
           name="Login"
           component={LoginScreen}
           option={{ header: ()=> null}}
       />    
       <Stack.Screen
           name="Signup"
           component={SignupScreen}
           options={({navigation}) => ({
              title: '같이골프치자',
              headerStyle: {
                 backgroundColor: '#f9fafd',
                 shadowColor:'#f9fafd',
                 elevation: 0
              },
              headerLeft: () => (
                <View style={{marginLeft: 10}}>
                    <FontAwesome.Button
                       name="long-arrow-left"
                       size={25}
                       backgroundColor="#f9fafd"
                       color='#333'
                       onPress={()=>navigation.navigate('Login')}
                    />   
                </View>
              )
           })}
        />   
    </Stack.Navigator>    
  )
}

export default AuthStack