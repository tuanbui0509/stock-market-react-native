import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../components/CustomHeader';
import HistoryPurchasedScreen from '../../screens/users/Statement/HistoryPurchasedScreen';
import PurchasedOneDayScreen from '../../screens/users/Statement/PurchasedOneDayScreen';
import HistoryOrderScreen from '../../screens/users/Statement/HistoryOrderScreen';
import HistoryAdvanceMoneyScreen from '../../screens/users/Statement/HistoryAdvanceMoneyScreen';
import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const createTopTabs = (props) => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
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
    <Tab.Screen
      name="Lịch sử ứng tiền"
      component={HistoryAdvanceMoneyScreen}
    />
  </Tab.Navigator>


}

const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function StatementStack({ navigation, route }) {
  const isFocused = useIsFocused();

  return (
    <>
      <CustomHeader title="Thông tin sao kê lệnh" isHome={true} navigation={navigation} />
      {isFocused ?
        <Stack.Navigator initialRouteName="TopTabsAssignment">
          <Stack.Screen name="TopTabsAssignment" children={createTopTabs} options={navOptionHandler} />
        </Stack.Navigator> : null}
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
