import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useState } from 'react';
import TabNavigator from '../../components/tab';
import AdvanceMoneyScreen from '../../screens/users/Account/AdvanceMoneyScreen';
import ChangePasswordScreen from '../../screens/users/Account/ChangePasswordScreen';
import ChangePinScreen from '../../screens/users/Account/ChangePinScreen';
import { DrawerContent } from './DrawerContent';
import InformationScreen from './InformationScreen';
import RegisterScreen from './RegisterScreen';

const navOptionHandler = () => ({
  headerShown: false
})

const Drawer = createDrawerNavigator();
export default function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <DrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} options={navOptionHandler} />
      <Drawer.Screen name="InformationScreen" component={InformationScreen} options={navOptionHandler} />
      <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} options={navOptionHandler} />
      <Drawer.Screen name="ChangePinScreen" component={ChangePinScreen} options={navOptionHandler} />
      <Drawer.Screen name="AdvanceMoneyScreen" component={AdvanceMoneyScreen} options={navOptionHandler} />
      <Drawer.Screen name="RegisterScreen" component={RegisterScreen} options={navOptionHandler} />
    </Drawer.Navigator>
  )
}

