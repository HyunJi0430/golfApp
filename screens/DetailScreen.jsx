import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import React from 'react'
import { data } from '../tempDB/data';
import CalendarStrip from 'react-native-calendar-strip';

const DetailScreen = () => {

  const selectedDate = (date) => {
      console.log(date.format('YYYY-MM-DD'));
  }  

  return (
    <SafeAreaView>
       <View>
          <CalendarStrip
             style={{ height: 100, paddingTop: 5, paddingBottom: 10 }}
             dateNumberStyle={{ color: '#999'}}
             dateNameStyle={{ color:'grey', paddingTop: 10}}
             highlightDateNumberStyle={{ color: 'black'}}
             highlightDateNameStyle={{color:'black'}}
             iconContainer={{ flex: 0.1 }}
             onDateSelected = { selectedDate }
          />
          <Text>DetailScreen</Text>
       </View>
    </SafeAreaView>
  )
}

export default DetailScreen

const styles = StyleSheet.create({})