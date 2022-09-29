import { View, Text } from 'react-native'
import React, {useContext} from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/HomeScreen'
import MessagesScreen from '../screens/MessagesScreen'
import ProfileScreen from '../screens/ProfileScreen'
import EditProfileScreen from '../screens/EditProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import BoardScreen from '../screens/BoardScreen';
import DetailScreen from '../screens/DetailScreen';
import DetailViewScreen from '../screens/DetailViewScreen';

import { AuthContext } from '../context/AuthProvider'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const FeedStack =({navigation}) => {
  const { logout } = useContext(AuthContext);   
 return  (
 <Stack.Navigator>
      <Stack.Screen
          name="Main"
          component={HomeScreen}
          options={{
             title:"같이골프치자",
             headerTitleAlign: 'center',
             headereTitleStyle: {
                fontFamily: 'Gugi-Regular',
                fontWeight: 'bold',
                fontSize: 20
             },
             headerTintColor:'#fff',
             headerStyle:  {
                shadowColor: '#b7ffc3',
                elevation: 5,
                backgroundColor: '#0c751e',
                borderBottomColor: '#063b0f',
                borderBottomWidth: 3
             },
             headerRight: ()=>(
              <View style={{width:100, marginRight: 10, flexDirection:'row', justifyContent:'space-between'}}>
                <MaterialCommunityIcons.Button
                     name="logout"
                     size={22}
                     backgroundColor="#ddd"
                     color="#e21e1e"
                     onPress={logout}
                 />  
                <FontAwesome5.Button
                     name="plus"
                     size={22}
                     backgroundColor="#ddd"
                     color="#0c751e"
                     onPress={()=> navigation.navigate('Board')}
                 />    
              </View>
             ),
          }}
      />    
      <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={{
              title: '날짜별보기',
              headerTitleAlign: 'center',
              headerStyle:{
                 backgroundColor:'#0c751e',
                 shadowColor:'#02300a',
                 elevation:2
              },
              headerTintColor: '#fff',
              headerBackTitleVisible: false,
              headerBackImage: ()=> (
                <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                </View>
              )
          }}
        />

        <Stack.Screen
          name="DetailView"
          component={ DetailViewScreen }
          options={{
              title: '',
              headerTitleAlign: 'center',
              headerStyle:{
                 backgroundColor:'#0c751e',
                 shadowColor:'#02300a',
                 elevation:2
              },
              headerTintColor: '#fff',
              headerBackTitleVisible: false,
              headerBackImage: ()=> (
                <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                </View>
              )
          }}
        />

      <Stack.Screen
          name="Board"
          component={BoardScreen}
          options={{
              title: '부킹팀등록',
              headerTitleAlign: 'center',
              headerStyle:{
                 backgroundColor:'#0c751e',
                 shadowColor:'#02300a',
                 elevation:2
              },
              headerTintColor: '#fff',
              headerBackTitleVisible: false,
              headerBackImage: ()=> (
                <View style={{marginLeft: 15}}>
                    <Ionicons name="arrow-back" size={25} color="#FFFFFF" />
                </View>
              )
          }}
        />
      <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
             title: '회원정보 수정',
             headeerTitleAlign: 'center',
             headerStyle: {
                backgroundColor:'#fff',
                shadowColor: '#fff',
                elevation: 0
             },
             headerBackTitleVisible: false,
             headerBackImage: ()=> (
                <View style={{ marginLeft: 15 }}>
                   <Ionicons name="arrow-back" size={25} color="#0c751e" />
                </View>
             )
          }}
        />  
  </Stack.Navigator>    
)};

const MessageStack =({navigation}) => (
  <Stack.Navigator>
      <Stack.Screen
          name="Messages"
          component={MessagesScreen}
      />
      <Stack.Screen    
          name="Chat"
          component={ChatScreen}
          options={({route})=>({
            title: route.params.userName,
            headerBackTitleVisible: false
          })}
      />
  </Stack.Navigator>
);

const ProfileStack = ({ navigation }) => (
  <Stack.Navigator>
      <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            headerShown: false
          }}
      />
      <Stack.Screen
          name="EditProfile"
          component={EditProfileScreen}
          options={{
            headerTitle: '회원정보 등록/수정'
          }}
      />          
  </Stack.Navigator>
);

const AppStack = () => {
    const getTabBarVisibility = (route) => {
    const routeName = route.state
          ? route.state.routes[route.state.index].name
          : '';  
    
    if(routeName === 'Chat') {
       return false;
    } 
    return true;
  };

  return (
     <Tab.Navigator
        screenOptions = {{
           tabBarActiveTintColor: '#0c751e'
        }}
     >
       <Tab.Screen
           name="Home"
           component= { FeedStack }
           options={            
            ({route})=>({
             tabBarLabel : 'Home',
             tabBarIcon: ({ color, size}) => (
                <MaterialCommunityIcons
                   name="home-outline"
                   color={color}
                   size={size}
                />           
             ),
             headerShown: false
           })}
       />    
       <Tab.Screen
           name="Message"
           component= { MessageStack }
           options={({route})=>({
             tabBarVisible: getTabBarVisibility(route),
             tabBarIcon: ({ color, size}) => (
                <Ionicons
                   name="chatbox-ellipses-outline"
                   color={color}
                   size={size}
                />           
             ),
             headerShown: false
           })}
       />  
       <Tab.Screen
           name="회원정보수정/등록"
           component= { ProfileStack }
           options={{
             tabBarIcon: ({ color, size}) => (
                <Ionicons
                   name="person-outline"
                   color={color}
                   size={size}
                />           
             )
           }}
       />         
     </Tab.Navigator>   
  )
}

export default AppStack