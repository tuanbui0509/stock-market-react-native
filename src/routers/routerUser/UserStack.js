import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../../components/CustomHeader';
import MyBankAccountScreen from '../../screens/users/Account/MyBankAccountScreen';
import MyStockScreen from '../../screens/users/Account/MyStockScreen';
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
      // tabBarItemStyle: { width: 100 },
      tabBarStyle: { backgroundColor: 'powderblue' },
    })}
    // tabBarOptions={{
    //   activeTintColor: '#007AFF',
    //   inactiveTintColor: '#555',
    //   activeBackgroundColor: '#fff',
    //   inactiveBackgroundColor: '#999',
    //   showLabel: true,
    //   labelStyle: { fontSize: 14 },
    //   showIcon: true,
    // }}
    activeColor='#f0edf6'
    inactiveColor='#3e2465'
    barStyle={{ backgroundColor: '#694fad' }}
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

const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function UserStack({ navigation, route }) {
  const [loading, setLoading] = useState(false)
  useEffect(() => {

  }, [setLoading])
  return (
    <>
      <CustomHeader title="Thông tin khách hàng" isHome={true} navigation={navigation} />
      <Stack.Navigator initialRouteName="TopTabs">
        <Stack.Screen name="TopTabs" children={createTopTabs} options={navOptionHandler} />
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

export default UserStack;
