import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { format } from 'date-fns'
// import ko from 'date-fns/esm/locale/ko'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const EndTimePicker = ({ insertData, setInsertData }) => {
  const [edDate, setEddate] = useState(new Date());
  const [mode, setMode] = useState('date'); // 팝업창 종류
  const [visible, setVisible] = useState(false); //처음에 안보이게 설정

  const onPressDate = () => {
    setMode('datetime');
    setVisible(true);
  }

  const onConfirm = (selectedDate) => {
    const edate = format(selectedDate, 'yyyy-MM-dd HH:mm')
    setVisible(false);
    setEddate(selectedDate);
    setInsertData({
      ...insertData,
      edate
  });
  }

  const onCancle = () => {
    setVisible(false);
  }
  return (
    <>
        <View style={styles.container}>
            <TouchableOpacity style={styles.endDate} onPress={ onPressDate }>
                <Text style={styles.endDateText}>마감일시선택</Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 16, textAlign: 'center'}}>{ format(edDate, 'yyyy-MM-dd HH:mm')}</Text>
        </View>

        <DateTimePickerModal
            isVisible={ visible }
            mode={ mode }
            locale="ko_KR"
            onConfirm={ onConfirm }
            onCancle={ onCancle }
            date={ edDate }
        />
    </>
  )
}

export default EndTimePicker

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    endDate: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: '#fc4233',
        borderRadius: 10
    },
    endDateText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
})