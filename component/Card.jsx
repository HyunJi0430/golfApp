import { StyleSheet, Text, View, Dimensions, TouchableOpacity  } from 'react-native'
import React, { useState, useEffect } from 'react'
import CardView from 'react-native-cardview'
import moment from 'moment'

const width = Dimensions.get('window').width-20;
const Card = ({navigation, id, course, address, membercount, mcount, money, sdate, edate }) => {
   
    const [ dday, setDday ] = useState(100);
   
    const addr = address.split(' ');
    const spaddr = addr[0] + ' ' + addr[1];
    const now = moment().format('YYYY-MM-DD');
    const actDate = sdate.substring(0, 10);

    const betweenDay = (fDate, sDate) => {
        let fDateObj = new Date(fDate.substring(0, 4), fDate.substring(5, 7)-1, fDate.substring(8, 10));
        let sDateObj = new Date(sDate.substring(0, 4), sDate.substring(5, 7)-1, sDate.substring(8, 10))
        const betweenTime = Math.abs(sDateObj.getTime() - fDateObj.getTime());
        return Math.floor(betweenTime / (1000 * 60 * 60 * 24));
    }
  
    useEffect(()=>{
       setDday(betweenDay(now, actDate));
    }, [])
   
    let bgcolor = (dday < 7)? '#d30326':'#0c751e';
    
    return (
     <CardView
        cardElevition={7}
        cardMaxElevation={7}
        cornerRedius={15}
        style={styles.card}
     >
      <View style={styles.container}>  
        <TouchableOpacity onPress={()=>navigation.navigate('DetailView', {
            id: id
        })}>
            <Text style={styles.title}>{course}</Text>
            <Text style={styles.sub}>{spaddr} | 남은인원 ({parseInt(membercount) - parseInt(mcount)} 명) </Text>
        </TouchableOpacity>
        <View>
            <Text style={[styles.new, {backgroundColor:bgcolor }]}>D-DAY:{dday}</Text>
        </View>
      </View>
      <View style={styles.footer}>
         <Text style={styles.money}>{money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 ~</Text>
         <TouchableOpacity 
            onPress={ ()=> navigation.navigate('Detail', {
                                                   actdate: sdate.substring(0, 10)
                                              })}>
                <Text style={styles.btnTxt}>{sdate.substring(8, 10)}일 더보기</Text></TouchableOpacity>  
      </View>   
     </CardView> 
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width,
        padding:20,
        marginBottom:20,
        elevation: 3,
        borderWidth: 1,
    },
    container: {
        flexDirection:'row',
        justifyContent:'space-between',
        borderBottomWidth: 2,
        borderBottomColor: '#ddd',
        paddingBottom:10,
        marginBottom:15
    },
    title:{
        fontSize:25,
        fontWeight: 'bold',
        color: '#000',
        marginBottom:8
    },
    sub: {
        fontSize: 14,
        fontWeight: '600'
    },
    new:{
        color:'#fff',
        paddingHorizontal: 10,
        paddingVertical:3,
        borderRadius:8,
        marginTop:15
    },
    footer:{
        flexDirection:'row',
        justifyContent:'space-between',
    },
    money:{
        fontSize: 20,
        fontWeight: 'bold',
        color:'#087417'
    },
    btnTxt: {
        fontSize: 16,
        fontWeight: 'bold'
    }
})