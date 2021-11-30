import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useIsFocused } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeader from '../../components/CustomHeader';
import { useOrientation } from '../../helpers/useOrientation';
import LightningTableFavoredScreen from '../../screens/users/LightningTable/LightningTableFavoredScreen';
import LightningTableScreen from '../../screens/users/LightningTable/LightningTableScreen';

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

const TopTabsLandscape = (props) => {
  return <Tab.Navigator
    screenOptions={({ route }) => ({
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

const isPortrait = () => {
  const dim = Dimensions.get('screen');
  return dim.height >= dim.width;
};

const navOptionHandler = () => ({
  headerShown: false
})


const Stack = createStackNavigator()

function LightningTableStack({ navigation, route }) {
  const orientation = useOrientation()
  const isFocused = useIsFocused();
  return (
    <>
      <CustomHeader title="Bảng điện thị trường" isHome={true} navigation={navigation} />
      {isFocused ?
        <Stack.Navigator initialRouteName="TopTabs">
          <Stack.Screen
            name="TopTabs"
            children={isPortrait() ? createTopTabs : TopTabsLandscape}
            options={navOptionHandler} />
        </Stack.Navigator>
        : null}

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
