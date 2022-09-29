import React, { useState, useEffect, useContext } from 'react'
import { 
  StyleSheet, 
  Text, 
  View,
  SafeAreaView, 
  ScrollView,
  Alert,
  Image
} from 'react-native'

import FormButton from '../component/FormButton'
import { AuthContext } from '../context/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ProfileScreen = ({ navigation, route }) => {

  const { user, logout } = useContext(AuthContext);

  const [ posts, setPosts ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ deleted, setDeleted ] = useState(false);
  const [ userData, setUserData ] = useState({
      age: 0,
      average: 0,
      createAt: '',
      email: '',
      fname: '',
      gender: false ,
      tel: '',
      userImg: null
   });

   const getUser = async() => {
     await firestore()
     .collection('members')
     .doc( route.params ? route.params.email : user.uid)
     .get()
     .then((res) => {
         //console.log(res.data());   
         const mem = res.data();
         if(mem.fname === '') {
            Alert.alert(
              '아직 회원정보를 입력하지 않으셨습니다.',
              '회원정보를 입력해 주세요.',
              [
                 {
                    text: '회원정보 수정(입력)',
                    onPress: () =>  navigation.navigate('EditProfile')
                 },
                 {
                    text: '취소',
                    onPress: () =>  navigation.navigate('Home')
                 }
              ]
            );
         }else{
            //console.log(mem);
             setUserData({...userData, ...mem});
         }
     })
  }

  useEffect(()=>{
     getUser();
     navigation.addListener('focus', ()=>setLoading(!loading));
  },[navigation, loading])
  console.log(userData.createAt.seconds);
  let createTime = '';

  if(userData){
     const tstamp = userData.createAt.seconds;
     let date = new Date(tstamp * 1000);
     createTime = `${date.getFullYear()}년 ${date.getMonth()+1}월 ${date.getDate()}일 ${date.getHours()}시 ${date.getMinutes()}분`;
  }

  return (
    <SafeAreaView style={styles.container}>
       <ScrollView style={{flex:1, padding:20}}
                          contentContainerStyle={{justifyContent:'center', alignItems:'center'}}
                          showsVerticalScrollIndicator={false}
       >
          <Image
             style={styles.userImg}
             source={{ uri: userData? 
                            userData.userImg
                            :'https://firebasestorage.googleapis.com/v0/b/my-app-d03d1.appspot.com/o/noimg.webp?alt=media&token=5969dd86-b4c1-4488-974c-8e6a115747fe'
                     }}
          />  
          <Text style={styles.userName}>
             {userData? userData.fname : '회원정보를 입력하세요.'}
          </Text>
          <View style={styles.aboutUserWrapper}>
              <Text style={styles.aboutUserLabel}>
                  이메일
              </Text>
              <Text style={styles.aboutUser}>
                  { userData&& userData.email }
              </Text>
          </View>
          <View style={styles.aboutUserWrapper}>
              <Text style={styles.aboutUserLabel}>
                  가입일
              </Text>
              <Text style={styles.aboutUser}>
                  { createTime }
              </Text>
          </View>
          <View style={styles.aboutUserWrapper}>
              <Text style={styles.aboutUserLabel}>
                  전화번호
              </Text>
              <Text style={styles.aboutUser}>
                  { userData&& userData.tel }
              </Text>
          </View>
          <View style={styles.aboutUserWrapper}>
              <Text style={styles.aboutUserLabel}>
                  성별
              </Text>
              <Text style={styles.aboutUser}>
                  { userData ?  userData.gender ? '남자':'여자':'' }
              </Text>
          </View>
          <View style={styles.aboutUserWrapper}>
              <Text style={styles.aboutUserLabel}>
                  나이
              </Text>
              <Text style={styles.aboutUser}>
                  { userData&& userData.age }
              </Text>
          </View>
          <View style={styles.aboutUserWrapper}>
              <Text style={styles.aboutUserLabel}>
                  에버리지
              </Text>
              <Text style={styles.aboutUser}>
                  { userData&& userData.average }
              </Text>
          </View>
          <View style={styles.userBtnWrapper}>
              <TouchableOpacity 
                 style={styles.userBtn}
                 onPress={()=>{
                     navigation.navigate('EditProfile')
                 }} 
              >
                 <Text style={styles.userBtnTxt}>회원정보수정</Text>  
              </TouchableOpacity> 
              <TouchableOpacity 
                  style={styles.userBtn}
                  onPress={()=> logout()}
              >
                 <Text style={[styles.userBtnTxt, {color: 'red'}]}>로그아웃</Text>  
              </TouchableOpacity>         
          </View>  
       </ScrollView>  
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#fff',
   },
   userImg: {
      height: 180,
      width: 180,
      borderRadius: 90
   },
   userName: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10
   },
   aboutUserWrapper: {
      borderTop: '2',
      borderColor: '#555',
      marginTop:15,
      flex: 1,
      flexDirection:'row',
      marginBottom: 10,
      width: '70%',
      justifyContent:'space-between',
      borderBottomWidth: 1,
      borderColore:'#555',
      borderStyle:'dashed',
      paddingBottom:10
   },
   aboutUserLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color:'#333',
    width: 70
   },
   aboutUser: {
      fontSize: 16,
      fontWeight: 'normal',
      color:'#555',
   },
   userBtnWrapper: {
      flexDirection:'row',
      justifyContent:'center',
      width:'100%',
      marginBottom: 10
   },
   userBtn: {
      borderColor: '#0c751e',
      borderWidth:2,
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 15,
      marginHorizontal:5
   },
   userBtnTxt: {
      fontSize: 16,
      fontWeight: 'bold',
      color:'#0c751e'
   },
   userInfoWrapper: {
      flexDirection:'row',
      justifyContent:'space-around',
      width:'100%',
      marginBottom: 20  
   },
   userInfoItem: {
      justifyContent: 'center'
   },
   userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign:'center'
   },
   userInfoSubTitle: {
     fontSize: 13,
     color:'#555',
     textAlign:'center'
   }
})