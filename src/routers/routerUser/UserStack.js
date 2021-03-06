import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../../components/CustomHeader';
import MyBankAccountScreen from '../../screens/users/Account/MyBankAccountScreen';
import MyStockScreen from '../../screens/users/Account/MyStockScreen';
import { useIsFocused } from '@react-navigation/native';

const Tab = createMaterialTopTabNavigator();
const createTopTabs = (props) => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size, color }) => {
        let iconName;
        if (route.name === 'Cổ phiếu hiện có') {
          iconName = 'cubes';
          size = focused ? 25 : 20;
          color = focused ? '#007AFF' : '#555';
        } else if (route.name === 'Tài khoản ngân hàng') {
          iconName = 'university';
          size = focused ? 25 : 20;
          color = focused ? '#007AFF' : '#555';
        }
        return (
          <FontAwesome5
            name={iconName}
            size={size}
            color={color}
          />
        )
      },
      tabBarLabelStyle: { fontSize: 12 },
      tabBarStyle: { backgroundColor: 'powderblue', display: 'flex', justifyContent: 'space-between' },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: '#555',
      tabBarActiveBackgroundColor: '#fff',
      showLabel: true,
    })}
  >
    <Tab.Screen
      name="Cổ phiếu hiện có"
      component={MyStockScreen}
    />
    <Tab.Screen
      name="Tài khoản ngân hàng"
      component={MyBankAccountScreen}
    />
  </Tab.Navigator>


}

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function UserStack({ navigation, route }) {
  const isFocused = useIsFocused();

  return (
    <>
      <CustomHeader title="Thông tin khách hàng" isHome={true} navigation={navigation} />
      {isFocused ? <Stack.Navigator initialRouteName="TopTabs">
        <Stack.Screen name="TopTabs" children={createTopTabs} options={navOptionHandler} />
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

export default UserStack;
