import { 
    StyleSheet, 
    Text, 
    View, 
    ScrollView,
    Image,
    TouchableOpacity,
    Alert
} from 'react-native'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';

import FormInput from '../component/FormInput';
import FormButton from '../component/FormButton'
import SocialButton from '../component/SocialButton';
import { validateEmail, removeWhitespace } from '../utils/Valitate'

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  
  const { signin } = useContext(AuthContext);


  const handleLogin = () => {
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
    signin(email, password)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Image source={require('../assets/logo.png')}
               style={styles.logo}
         />         
        <Text style={styles.text}>같이골프치자</Text> 
        
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

        <FormButton
            buttonTitle=" 로 그 인 "
            backgroundColor = '#0c751e'
            onPress={handleLogin}
        />    

        <TouchableOpacity style={styles.forgotButton} onPress={()=>{}}>
            <Text style={styles.navButtonText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View>
            <SocialButton
                buttonTitle="Facebook 로그인"
                btnType="facebook"
                color="#3b5998"
                backgroundColor="#e6eaf4"
            />
            <SocialButton  
                buttonTitle="Google 로그인"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
            />  
        </View>

        <FormButton
            buttonTitle=" 회 원 가 입 "
            onPress={() => navigation.navigate('Signup')}
            backgroundColor = '#467cf0'
        />    
    </ScrollView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        justifyContent:'center',
        alignItems:'center',
        padding: 20,
        paddingTop: 50
    },
    logo: {
        height: 150,
        width: 150,
        resizeMode: 'contain'
    },
    text: {
        fontFamily: 'Gugi-Regular',
        fontSize: 28,
        marginBottom: 10,
        marginTop: 10,
        color: '#0c751e',
    },
    forgotButton: {
        marginVertical: 35
    },
    navButtonText:{
        fontSize: 18,
        fontWeight:'500',
        color:'#c51313',
    },
    signupButtonText:{
        fontSize: 18,
        fontWeight:'700',
        color:'#0c751e',
    }
})