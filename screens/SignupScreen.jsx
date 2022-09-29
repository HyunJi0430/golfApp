import { StyleSheet, Text, View, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthProvider';

import FormInput from '../component/FormInput';
import FormButton from '../component/FormButton'
import SocialButton from '../component/SocialButton';
import { validateEmail, removeWhitespace } from '../utils/Valitate'

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();

  const { signup } = useContext(AuthContext);

  const handleSignup = () => {
    if(email) {
      const changeemail = removeWhitespace(email);
      if(!validateEmail(changeemail)){
         console.log(validateEmail(changeemail))
         Alert.alert('이메일 형식으로 입력하세요.');
         return 
      }  
    }else{
      Alert.alert('이메일을 입력하세요.');
      return
    }

    if(!password) {
      Alert.alert('비밀번호를 입력하세요.');
      return
    }
    if(!repassword) {
      Alert.alert('비밀번호를 다시 확인해 주세요.');
      return;
    }
    if(password !== repassword) {
      Alert.alert('비밀번호가 다릅니다. 다시 확인하세요.');
       return;
    }
    signup(email, password);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>회원가입</Text>

        <FormInput
            labelValue={email}
            onChangeText={(text) => setEmail(text)}
            placeholderText = "이메일"
            iconType="user"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
        />

        <FormInput
            labelValue={password}
            onChangeText={(text) => setPassword(text)}
            placeholderText = "비밀번호"
            iconType="lock"
            secureTextEntry = {true}
        />

        <FormInput
            labelValue={repassword}
            onChangeText={(text) => setRepassword(text)}
            placeholderText = "비밀번호 확인"
            iconType="lock"
            secureTextEntry = {true}
        />

        <FormButton
            buttonTitle=" 회 원 가 입 "
            backgroundColor = '#0c751e'
            onPress={handleSignup}
        />    

      <View>
         <SocialButton
             buttonTitle="페이스북으로 가입"
             btnType="facebook"
             color="#3b5998"
             backgroundColor="#e6eaf4"
         />
         <SocialButton
             buttonTitle="구글로 가입"
             btnType="google"
             color="#de4d41"
             backgroundColor="#f5e7ea"
         />          
      </View>

    </View>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
     backgroundColor: '#f9fafd',
     flex: 1,
     justifyContent:'center',
     alignItems:'center',
     padding:20
  },
  text: {
     fontSize: 28,
     marginBottom: 10,
     color:'#04460f',
     fontWeight:'bold'
  },
  navButton: {
     marginTop: 15
  },
  navButtonText: {
    fontSize: 18,
    fontWeight:'600',
    color: '#0c751e',
  }
})