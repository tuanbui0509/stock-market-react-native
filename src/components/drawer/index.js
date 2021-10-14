import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useState } from 'react';
import TabNavigator from '../../components/tab';
import ChangePasswordScreen from '../../screens/users/Account/ChangePasswordScreen';
import { DrawerContent } from './DrawerContent';
import InformationScreen from './InformationScreen';

const navOptionHandler = () => ({
  headerShown: false
})

const Drawer = createDrawerNavigator();
export default function DrawerNavigator({ navigation }) {
  const [Loading, setLoading] = useState(false)
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <DrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} options={navOptionHandler} />
      <Drawer.Screen name="InformationScreen" component={InformationScreen} options={navOptionHandler} />
      <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={navOptionHandler} />
    </Drawer.Navigator>
  )
}

