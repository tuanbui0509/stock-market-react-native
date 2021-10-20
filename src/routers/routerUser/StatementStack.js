import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import HistoryPurchasedScreen from '../../screens/users/Statement/HistoryPurchasedScreen';
import PurchasedOneDayScreen from '../../screens/users/Statement/PurchasedOneDayScreen';
import HistoryOrderScreen from '../../screens/users/Statement/HistoryOrderScreen';
const Tab = createMaterialTopTabNavigator();
const createTopTabs = (props) => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      // tabBarIcon: ({ focused, size, color }) => {
      //   let iconName;
      //   if (route.name === 'Lệnh trong ngày') {
      //     iconName = 'receipt-outline';
      //     size = focused ? 25 : 20;
      //     color = focused ? '#007AFF' : '#555';
      //   } else if (route.name === 'Lịch sử lệnh đặt') {
      //     iconName = 'md-newspaper-outline';
      //     size = focused ? 25 : 20;
      //     color = focused ? '#007AFF' : '#555';
      //   }
      //   else if (route.name === 'Lịch sử khớp lệnh') {
      //     iconName = 'md-documents-outline';
      //     size = focused ? 25 : 20;
      //     color = focused ? '#007AFF' : '#555';
      //   }
      //   return (
      //     <Ionicons
      //       name={iconName}
      //       size={size}
      //       color={color}
      //     />
      //   )
      // },
      tabBarLabelStyle: { fontSize: 12, fontWeight: 'bold' },
      tabBarStyle: { backgroundColor: 'powderblue' },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#555',
      tabBarActiveBackgroundColor: '#fff',
      tabBarInactiveBackgroundColor: '#999',
      showLabel: true,
    })}
    activeColor='#f0edf6'
    inactiveColor='#3e2465'
    barStyle={{ backgroundColor: '#694fad' }}
  >
    <Tab.Screen
      name="Lệnh trong ngày"
      component={PurchasedOneDayScreen}
    />
    <Tab.Screen
      name="Lịch sử lệnh đặt"
      component={HistoryPurchasedScreen}
    />
    <Tab.Screen
      name="Lịch sử khớp lệnh"
      component={HistoryOrderScreen}
    />
  </Tab.Navigator>


}

const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function StatementStack({ navigation, route }) {
  return (
    <>
      <CustomHeader title="Thông tin sao kê lệnh" isHome={true} navigation={navigation} />
      <Stack.Navigator initialRouteName="TopTabsAssignment">
        <Stack.Screen name="TopTabsAssignment" children={createTopTabs} options={navOptionHandler} />
      </Stack.Navigator>
    </>
  )
}


export const styles = StyleSheet.create({
  center: {
    flex: 1,
    margin: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 36,
    marginBottom: 16
  },
  androidButtonText: {
    color: 'blue',
    fontSize: 20
  }
});

export default StatementStack;
