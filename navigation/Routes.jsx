import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/AuthProvider'
import auth from '@react-native-firebase/auth';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
  const { user, setUser } = useContext(AuthContext);  
  const [ initializing, setInitializing ] =useState(true);

const AppTheme = {
   ...DefaultTheme,
   colors: {
      ...DefaultTheme.colors,
      background: '#ededed'
   }
}

  // Handle user state changes
   const onAuthStateChanged = (user) => {
      setUser(user);
     if (initializing) setInitializing(false);
   };
    
   useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber; // unsubscribe on unmount
   }, []);
    
   if (initializing) return null;

  return (
    <NavigationContainer theme={AppTheme}>
       { user ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
  )
}

export default Routes;