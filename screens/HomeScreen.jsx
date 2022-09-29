import React, { useEffect, useState } from 'react'
import {
    StyleSheet, 
    Text, 
    View,
    ScrollView,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    Alert ,
    Dimensions 
} from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { Container } from '../styles/mainStyle'

import { data } from '../tempDB/data';
import CarouselCourse from '../component/CarouselCourse'
import Card from '../component/Card'

const HomeScreen = ({ navigation }) => {
  const [datas, setDatas ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleted, setDeleted] = useState(false);

  useEffect(()=>{
     setDatas(data);
  }, [])

  /*
  const fetchPosts = async () => {
     try {
        const list = [];
        await firestore() 
        .collection('posts')
        .orderBy('postTime', 'desc')
        .get()
        .then((querySnapshot) => {
           console.log('Total Posts ;' , querySnapshot.size)
        })
     }catch(e) {
       
     }
  }
  */

  const ListHeader = () => {
    return null;
 }

  const vlists = ({item}) => {
     return (
        <Card course={item.course}
              address={item.address}
              membercount={item.membercount}
              mcount={item.mcount}
              money={item.money}
              sdate={item.sdate}
              edate={item.edate}
              navigation={navigation}
              id={item.id}
         />     
     )
  }

  return ( 
    <SafeAreaView style={{flex: 1, backgroundColor:'#dedede'}}>
      { loading? (
       <ScrollView style={{flex: 1}}
                   contentContainerStyle={{alignItems: 'center'}}  
       >
       <SkeletonPlaceholder>
          <View style={{flexDirectioin: 'row', alignItems:'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 25}} />
              <View style={{marginLeft: 20}}>
                  <View style={{width:120, height:20, borderRadius: 4}} />
                  <View style={{marginTop: 6, width:80, height: 20, borderRadius: 4 }} />
              </View>
          </View> 
          <View style={{marginTop: 10, marginBottom: 30}}>
             <View style={{width: 300, height: 20, borderRadius: 4}} />
             <View style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}} />
             <View style={{marginTop: 6, width: 350, height:200, borderRadius: 4}} />
          </View>
       </SkeletonPlaceholder>    
       <SkeletonPlaceholder>
          <View style={{flexDirectioin: 'row', alignItems:'center'}}>
              <View style={{width: 60, height: 60, borderRadius: 25}} />
              <View style={{marginLeft: 20}}>
                  <View style={{width:120, height:20, borderRadius: 4}} />
                  <View style={{marginTop: 6, width:80, height: 20, borderRadius: 4 }} />
              </View>
          </View> 
          <View style={{marginTop: 10, marginBottom: 30}}>
             <View style={{width: 300, height: 20, borderRadius: 4}} />
             <View style={{marginTop: 6, width: 250, height: 20, borderRadius: 4}} />
             <View style={{marginTop: 6, width: 350, height:200, borderRadius: 4}} />
          </View>
       </SkeletonPlaceholder>  
       </ScrollView>
      ) : (
        <Container>
           <CarouselCourse /> 
           <View style={{ 
             width:'100%', 
             paddingHorizontal:10, 
             paddingBottom:15, 
             alignItems:'flex-end'
            }}>
               <TouchableOpacity style={{ 
                  padding:5, 
                  borderWidth:1, 
                  marginTop:-10, 
                  borderColor:'#0c751e',
                  borderRadius: 5 }}
                 onPress={()=>navigation.navigate('Detail', { actdate: ''})}
               >
                 <Text> 날짜별보기 </Text>
               </TouchableOpacity>
           </View>
           <View style={styles.container}>
              <FlatList 
                data={datas}
                key={ item => item.id}
                renderItem = {vlists}
              />
           </View>
        </Container>
      )}       
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
   container: {
      flex: 1,
   }
})