import { StyleSheet, Text, View, Dimensions  } from 'react-native'
import React, { useEffect } from 'react'
import Picker from 'react-native-picker-horizontal'

const zones = [
    '서울', '부산', '대구', '인천', '광주', '대전',
    '울산', '세종', '경기도', '강원도', '충청북도', '충청남도',
    '경상북도', '경상남도', '전라북도', '전라남도', '제주'
  ];

  const itemWidth = 90;
  const renderItem = (item, index) => (
     <View style={[ styles.item, { width: itemWidth }]}>
        <Text style={styles.itemText}>
            { item }
        </Text>
     </View>
  )


const LocalName = ({ selectedCity }) => {
  return (
    <>
    <Picker 
    data={zones}
    renderItem = {renderItem}
    itemWidth={itemWidth}
    intialIndex={3}
    onChange={ v => selectedCity(zones[v])} 
    />
    </>   
  )
}

export default LocalName

const styles = StyleSheet.create({
    item: {
        padding: 5,
     },
     itemText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000'
     },
})