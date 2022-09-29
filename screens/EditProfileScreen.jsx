import { 
   StyleSheet, 
   Text, 
   View,
   TouchableOpacity,
   Alert ,
   ImageBackground,
   Platform,
   Switch,
   Dimensions
} from 'react-native'
import React, { useEffect, useContext, useState } from 'react'

import { AuthContext } from '../context/AuthProvider'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native-gesture-handler';

import Animated, { FadeInDown } from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet'
import ImagePicker from 'react-native-image-crop-picker';

import FormButton from '../component/FormButton';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const EditProfileScreen = ({ navigation, route }) => {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [userData, setUserData] = useState({
      age: 0,
      average: 0,
      email: user.email,
      fname:'',
      gender: false,
      tel: '',
      userImg: null
  });

  const getUser = async() => {
    await firestore()
    .collection('members')
    .doc( route.params ? route.params.email : user.uid)
    .get()
    .then((res) => {
        if(res.exists){
           setUserData(res.data());
        }
    })
  }
  
  const uploadImage = async () => {
     if(image === null) {
        return null;
     }
     const uploadUri = image;
     let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

     //파일이름에 날짜 추가해서 이름 변경
     const extension = filename.split('.').pop();
     const fname = filename.split('.').slice(0, -1).join('.');
     filename = fname + Date.now() + '.' + extension;
     setUploading(true);
     setTransferred(0);
     const storageRef = storage().ref(`members/${filename}`);
    //업로딩 카운트
     const task = storageRef.putFile(uploadUri);

     task.on('state_changed', (taskSnapshot) => {
          console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);

          setTransferred(
             Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100
          );
    });
    try {
       await task;
       const url = await storageRef.getDownloadURL();
       setUploading(false); 
       setImage(null);
       return url;
    }catch(e) {
       console.log(e);
       return null;
    }
  }

  const handleUpdate = async () => {
     let imgUrl = await uploadImage();
     if(imgUrl === null && userData.userImg) {
         imgUrl = userData.userImg;
     }

     firestore()
     .collection('members')
     .doc(user.uid)
     .update({
         age: userData.age,
         average: userData.average,
         fname: userData.fname,
         gender: userData.gender,
         tel: userData.tel,
         userImg: imgUrl
     })
     .then(()=>{
      Alert.alert(
        '프로필이 업데이트 되었습니다.',
        '',[
          {
            text: '확인',
            onPress: ()=> {
              navigation.navigate('Profile');
            }
          }
        ] 
      );
   })
   .catch((error)=>{
      Alert.alert('Error' , error.message)
   }) 
}

  const toggleSwitch = () => {
     const gnd = !userData.gender;
     setUserData({...userData, gender: gnd});
  }

  useEffect(()=>{
     getUser();
  }, []);
 
  const takePhotoFromCamera = () => {
     ImagePicker.openCamera({
        compressImageMaxHeight: 300,
        compressImageMaxWidth:300,
        cropping: true,
        compressImageQuality: 0.7     
      }).then((image)=>{
         //console.log(image);
         const imageUrl = Platform.OS === 'ios' ? image.sourceURL : image.path;
         setImage(imageUrl);
         this.bs.current.snapTo(1);
      })
  }
  const takePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      compressImageMaxHeight: 300,
      compressImageMaxWidth:300,
      cropping: true,
      compressImageQuality: 0.7     
    }).then((image)=>{
       //console.log(image);
       const imageUrl = Platform.OS === 'ios' ? image.sourceURL : image.path;
       setImage(imageUrl);
       this.bs.current.snapTo(1);      
    })
  }

  bs = React.createRef();
  fall = new Animated.Value(1);

  renderInner = () => {
    return(
      <View style={styles.panel}>
      <View style={{alignItems:'center'}}>
          <Text style={styles.panelTitile}>사진업로드</Text>
          <Text style={styles.panelSubtitle}>프로필사진을 선택하세요.</Text>
      </View>
      <TouchableOpacity
           style={styles.panelButton}
           onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>사진찍기</Text>
      </TouchableOpacity>
      <TouchableOpacity
           style={styles.panelButton}
           onPress={takePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>갤러리에서 가져오기</Text>
      </TouchableOpacity>
      <TouchableOpacity
           style={[styles.panelButton, { marginBottom:40 }]}
           onPress={() => this.bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>취 소</Text>
      </TouchableOpacity>
   </View>
    ); 
  }

  renderHeader = () => (
       <View style={styles.header}>
           <View style={styles.panelHeader}>
              <View style={styles.panelHandle} />
           </View>
       </View>
 );

 const { age, average, email, fname, gender, tel, userImg } = userData;
 
 return (
    <View style={styles.container}>
       <BottomSheet
         ref={this.bs}
         snapPoints={[400, -5]}
         renderContent= {this.renderInner}
         renderHeader= {this.renderHeader}
         initialSnap={1}
         callbackNode={this.fall}
         enabledGestureInteraction={true}
       />
       <Animated.View 
           style={{
              margn: 20,
              opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0))
           }}
       >    
       <View style={{alignItems: 'center'}}>
           <TouchableOpacity onPress={()=>this.bs.current.snapTo(0)}>
             <View
                style={{
                    height: 100,
                    width: 100,
                    borderRadius: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
             <ImageBackground
                  source={{
                    uri: image
                    ? image
                    : userData
                       ? userData.userImg ||
                           'https://firebasestorage.googleapis.com/v0/b/my-app-d03d1.appspot.com/o/members%2Fback.png?alt=media&token=ce3dcee0-779d-457d-abc7-587f134ea180'
                            : 'https://firebasestorage.googleapis.com/v0/b/my-app-d03d1.appspot.com/o/members%2Fback.png?alt=media&token=ce3dcee0-779d-457d-abc7-587f134ea180',
                  }}
                 style={{height: 100, width: 100}}
                 imageStyle={{borderRadius: 15}}>
                <View
                    style={{
                       flex: 1,
                       justifyContent: 'center',
                       alignItems: 'center',
                }}>
                <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                       opacity: 0.7,
                       alignItems: 'center',
                       justifyContent: 'center'
                    }}
                  />
                </View>
              </ImageBackground>
             </View>
          </TouchableOpacity>
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight:'bold'}}>
              {email} 님
          </Text>
      </View>
      <View style={styles.action}>
          <FontAwesome name="user-o" color="#333" size={20} style={{marginRight:15}} />
          <TextInput 
              placeholder="닉네임"
              placeholderTextColor="#999"
              autoCorrect={false}
              style={styles.textInput}
              value={fname}
              onChangeText={(txt)=>setUserData({...userData, fname: txt})}
          />    
      </View>
      <View style={styles.action}>
          <FontAwesome name="user-o" color="#333" size={20} style={{marginRight:15}} />
          <Text style={{ marginRight: 20 }}>성별</Text>
          <Text style={ !gender? {fontWeight:'bold'}:'' }>여자</Text>
             <Switch
                trackColor={{ false: "#767577", true: "#0c751e"}}
                thumbColor={ gender ? "#f5dd4b" : "#f4f3f4" }
                ios_backgroundColor="#3e3e3e"
                onValueChange={ toggleSwitch }
                value={gender}
             />   
          <Text style={ gender? {fontWeight:'bold'}:'' }>남자</Text> 
      </View>
      <View style={styles.action}>
          <FontAwesome name="user-o" color="#333" size={20} style={{marginRight:15}} />
          <TextInput 
              placeholder="나이"
              placeholderTextColor="#999"
              autoCorrect={false}
              style={styles.textInput}
              value={age}
              onChangeText={(txt)=>setUserData({...userData, age: txt})}
              keyboardType='numeric'
          />    
      </View>
      <View style={styles.action}>
          <FontAwesome name="user-o" color="#333" size={20} style={{marginRight:15}} />
          <TextInput 
              placeholder="전화번호"
              placeholderTextColor="#999"
              autoCorrect={false}
              style={styles.textInput}
              value={tel}
              keyboardType='numeric'
              onChangeText={(txt)=>setUserData({...userData, tel: txt})}
          />    
      </View>
      <View style={styles.action}>
          <FontAwesome name="user-o" color="#333" size={20} style={{marginRight:15}} />
          <TextInput 
              placeholder="평균타수"
              placeholderTextColor="#999"
              autoCorrect={false}
              keyboardType='numeric'
              style={styles.textInput}
              value={average}
              onChangeText={(txt)=>setUserData({...userData, average: txt})}
          />    
      </View>
      <View style={[styles.action, {borderBottomColor: 'transparent'}]}>
      <FormButton 
        buttonTitle="회원정보등록(수정)" 
        backgroundColor = '#0c751e'
        onPress={handleUpdate}
      />
      </View>
      </Animated.View>
    </View>
  )
}

export default EditProfileScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff'
   },
   commandButton : {
      padding: 15,
      borderRadius: 10,
      backgroundColor: '#ff6137',
      alignItems: 'center',
      marginTop: 10
   },
   panel: {
      padding: 40,
      backgroundColor: '#ddd',
      width: deviceWidth
   },
   header: {
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: { width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
   },
   panelHeader: {
     alignItems:'center'
   },
   panelHandle: {
     width: 40,
     height: 8,
     borderRadius: 5,
     backgroundColor:'#00000040',
     marginBottom: 10
   },
   panelTitile: {
     fontSize: 28,
     height: 35
   },
   panelSubtitle: {
     fontSize: 15,
     color:'#999',
     height: 30,
     marginBottom: 10
   },
   panelButton: {
     padding: 13,
     borderRadius: 10,
     backgroundColor: '#0c751e',
     alignItems:'center',
     marginVertical: 7  
   },
   panelButtonTitle: {
     fontSize: 18,
     fontWeight: 'bold',
     color:'#fff'  
   },
   action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#d2d2d2',
    paddingBottom: 5,
    alignItems:'center',
    marginHorizontal: 30
   },
   actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ff0000',
    paddingBottom: 5 
   },
   textInput: {
     flex: 1,
     marginTop: Platform.OS === 'ios' ? 0 : -12,
     paddingLeft: 10,
     color: '#333'
   }
})