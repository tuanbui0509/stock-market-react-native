import { createDrawerNavigator } from '@react-navigation/drawer';
////////////////////////////
import React from 'react';
import TabNavigator from '../../components/tab';
import { DrawerContent } from './DrawerContent';
import NotificationsScreen from './NotificationsScreen';

const navOptionHandler = () => ({
  headerShown: false
})

const Drawer = createDrawerNavigator();
export default function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <DrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} options={navOptionHandler} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} options={navOptionHandler} />
    </Drawer.Navigator>
  )
}

