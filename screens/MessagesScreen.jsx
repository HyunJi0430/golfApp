import { StyleSheet, FlatList } from 'react-native'
import React from 'react'
import {
   Container,
   Card,
   UserInfo,
   UserImgWrapper,
   UserImg,
   UserInfoText,
   UserName,
   PostTime,
   MessageText,
   TextSection
} from '../styles/messageStyle';

const Messages = [
   { 
      id: '1',
      userName: '홍길동',
      userImg: require('../assets/members/001.jpg'),
      messageTime: '2022.09.23 10:11',
      messageText: '환영해 주셔서 감사합니다. 좋은 시간 이었어요.'
   },
   { 
    id: '2',
    userName: '김길자',
    userImg: require('../assets/members/002.jpg'),
    messageTime: '2022.09.23 10:15',
    messageText: '사용하기 쉽고 시각적으로 멋진 React Native용 캘린더 구성 요소.'
 },
 { 
  id: '3',
  userName: '박찬동',
  userImg: require('../assets/members/003.jpg'),
  messageTime: '2022.09.23 10:20',
  messageText: 'facebook/react-native: A framework for building'
},
{ 
  id: '4',
  userName: '성길여',
  userImg: require('../assets/members/004.jpg'),
  messageTime: '2022.09.23 10:25',
  messageText: '[RN] React-Native의 장단점은?'
},
{ 
  id: '5',
  userName: '오작동',
  userImg: require('../assets/members/005.jpg'),
  messageTime: '2022.09.23 10:30',
  messageText: 'UWP용 애플리케이션을 개발하기 위해 사용되며, 개발자들이 네이티브 플랫폼 기능과 더불어 리액트를 사용할 수 있게 한다.'
}
]

const MessagesScreen = ({ navigation }) => {

  return (
    <Container>
       <FlatList 
          data={Messages}
          keyExtractor={ item=>item.id}
          renderItem={({item})=> (
             <Card onPress={()=>navigation.navigate('Chat', { userName: item.userName})}>
                <UserInfo>
                    <UserImgWrapper>
                        <UserImg source={item.userImg} />
                    </UserImgWrapper>
                    <TextSection>
                        <UserInfoText>
                            <UserName>{item.userName}</UserName>
                            <PostTime>{item.messageTime}</PostTime>
                        </UserInfoText>
                        <MessageText>{item.messageText}</MessageText>
                    </TextSection>
                </UserInfo>
             </Card>  
          )}
       />   
    </Container>
  )
}

export default MessagesScreen

const styles = StyleSheet.create({})