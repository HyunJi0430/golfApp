import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
//import { GoogleSignin } fro '@react-native-community/google-signin
//import { LoginManager, AccessToken } from 'react-native-fbsdk';

export const AuthContext = createContext();

export const AuthProvider = ( { children }) => {

  const [user, setUser] = useState(null);
  
  //로그인
  const signin = async ( email, password ) => {
      try{
         await auth().signInWithEmailAndPassword(email, password); 
      }catch(e){
         console.log(e);
      }
  }

  //로그아웃
  const logout = async() => {
    try{
        await auth().signOut();
    }catch(e){
        console.log(e)
    }
  }

  //회원가입
  const signup = async (email, password) => {
     try{
         await auth().createUserWithEmailAndPassword(email, password)
         .then(()=>{
            firestore().collection('members').doc(auth().currentUser.uid)
            .set({
                fname: '',
                gender: '',
                age: 20,
                average: 99,
                email: email,
                tel: '',
                createAt: firestore.Timestamp.fromDate(new Date()),
                userImg: null
            })
          .catch(error=> console.log('데이터저장중 에러발생', error))  
         })

     }catch(e){
        console.log(e)
     }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, signin, signup, logout }}>
        { children }
    </AuthContext.Provider>
  )
}