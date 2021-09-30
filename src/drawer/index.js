import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';
import NotificationsScreen from './NotificationsScreen';
import TabNavigator from '../tab';

const navOptionHandler = () => ({
  headerShown: false
})

const Drawer = createDrawerNavigator();
export default function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} options={navOptionHandler} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} options={navOptionHandler} />
    </Drawer.Navigator>
  )
}