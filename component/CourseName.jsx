import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import Picker from 'react-native-picker-horizontal'
  
const width = Dimensions.get('window').width;
const itemWidth = 110;

const renderItem = (item) => {
    let coursename;
    if(item.coursename.length > 7) {
        coursename = item.coursename.substring(0, 6) + '..';
    }else{
        coursename = item.coursename;
    }
    return (
        <View style={styles.item}>
            <Text style={styles.itemTexta}>{coursename}</Text>
            <Text style={styles.itemTextb}>{item.tel?item.tel:''}</Text>
        </View>
    )
}
const CourseName = ({ course }) => {
  return (
    <>
        <Picker
            data={course}
            renderItem={renderItem}
            itemWidth={itemWidth}
            initialIndex={1}
            onChange={ item => console.log(item)}
            style={{ postion:'absolute', left: -140, zIndex: 1}}
        />
    </>
  )
}

export default CourseName

const styles = StyleSheet.create({
    item:{
        marginTop: 20,
        width: itemWidth,
        height: 50
    },
    itemTexta:{
        fontWeight: 'bold',
        fontSize: 9,
        color:'#666',
        textAlign: 'center'
    },
    itemTextb:{
        textAlign: 'center',
        fontSize: 6,
        color: '#555'
    }
})