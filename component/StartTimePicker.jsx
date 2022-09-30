import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { format } from 'date-fns'
import ko from 'date-fns/esm/locale/ko'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const StartTimePicker = ({ insertData, setInsertData }) => {
  const [stDate, setStdate] = useState(new Date());
  const [mode, setMode] = useState('date'); // 팝업창 종류
  const [visible, setVisible] = useState(false); //처음에 안보이게 설정

  const onPressDate = () => {
    setMode('datetime');
    setVisible(true);
  }

  const onConfirm = (selectedDate) => {
    const sdate = format(selectedDate, 'yyyy-MM-dd HH:mm')
    setVisible(false);
    setStdate(selectedDate);
    setInsertData({
      ...insertData,
      sdate
  });
  }

  const onCancle = () => {
    setVisible(false);
  }
  return (
    <>
        <View style={styles.container}>
            <TouchableOpacity style={styles.startDate} onPress={ onPressDate }>
                <Text style={styles.startDateText}>시작일시선택</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, textAlign: 'center'}}>{ format(stDate, 'yyyy-MM-dd HH:mm')}</Text>
        </View>

        <DateTimePickerModal
            isVisible={ visible }
            mode={ mode }
            onConfirm={ onConfirm }
            onCancle={ onCancle }
            date={ stDate }
        />
    </>
  )
}

export default StartTimePicker

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    startDate: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#0c751e',
        borderRadius: 10
    },
    startDateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})