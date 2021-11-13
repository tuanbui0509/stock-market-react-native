import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../../components/CustomHeader';
import LightningTableScreen from '../../screens/users/LightningTable/LightningTableScreen';
import LightningTableFavoredScreen from '../../screens/users/LightningTable/LightningTableFavoredScreen';
import * as Api from '../../api/LightningTable';
import { fetchLightningTable } from '../../store/common/LightningTable';
import { fetchLightningTableFavored } from '../../store/common/LightningTableFavored';
import { useDispatch } from 'react-redux';

const Tab = createMaterialTopTabNavigator();
const createTopTabs = (props) => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, size, color }) => {
        let iconName;
        if (route.name === 'Sàn giao dịch') {
          iconName = 'chart-bar';
          size = focused ? 25 : 20;
          color = focused ? '#007AFF' : '#555';
        } else if (route.name === 'Danh mục đầu tư') {
          iconName = 'hand-holding-heart';
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
      name="Sàn giao dịch"
      component={LightningTableScreen}
    />
    <Tab.Screen
      name="Danh mục đầu tư"
      component={LightningTableFavoredScreen}
    />
  </Tab.Navigator>


}

const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function LightningTableStack({ navigation, route }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      const fetchApiFavored = async () => {
        const res = await Api.LightningTableFavored()
        dispatch(fetchLightningTableFavored(res.data))
      }
      const fetchApi = async () => {
        const res = await Api.LightningTable()
        dispatch(fetchLightningTable(res.data))
      }
      fetchApi()
      fetchApiFavored()
    });
    return unsubscribe;
  }, [navigation]);
  return (
    <>
      <CustomHeader title="Bảng điện thị trường" isHome={true} navigation={navigation} />
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

export default LightningTableStack;
