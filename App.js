import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Image, SafeAreaView, Text, View } from 'react-native';
import LoginScreen from './src/auth/LoginScreen';
import RegisterScreen from './src/auth/RegisterScreen';
import { IMAGE } from './src/constants/Image';
import CustomDrawerContent from './src/CustomDrawerContent';
import CustomHeader from './src/CustomHeader';
import NotificationsScreen from './src/drawer/NotificationsScreen';
import HomeScreen from './src/tab/HomeScreen';
import HomeScreenDetail from './src/tab/HomeScreenDetail';
import SettingsScreen from './src/tab/SettingsScreen';
import SettingsScreenDetail from './src/tab/SettingsScreenDetail';


const Tab = createBottomTabNavigator();

const navOptionHandler = () => ({
  headerShown: false
})

const StackHome = createStackNavigator()

function HomeStack({ navigation, route }) {
  return (
    <StackHome.Navigator initialRouteName="Home">
      <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
      <StackHome.Screen name="HomeDetail" component={HomeScreenDetail} options={navOptionHandler} />
    </StackHome.Navigator>
  )
}

const StackSetting = createStackNavigator()

function SettingStack({ navigation, route }) {
  return (
    <StackSetting.Navigator initialRouteName="Setting">
      <StackSetting.Screen name="Setting" component={SettingsScreen} options={navOptionHandler} />
      <StackSetting.Screen name="SettingDetail" component={SettingsScreenDetail} options={navOptionHandler} />
    </StackSetting.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'HomeStack') {
            iconName = focused
              ? IMAGE.ICON_HOME
              : IMAGE.ICON_HOME_BLACK;
          } else if (route.name === 'Settings') {
            iconName = focused ?
              IMAGE.ICON_SETTINGS
              : IMAGE.ICON_SETTINGS_BLACK;
          }
          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: 20, height: 20 }}
            resizeMode="contain" />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'black',
      }}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={navOptionHandler} />
      <Tab.Screen name="Settings" component={SettingStack} options={navOptionHandler} />
    </Tab.Navigator>
  )
}

const Drawer = createDrawerNavigator();

function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator initialRouteName="MenuTab"
      drawerContent={() => <CustomDrawerContent navigation={navigation} />}>
      <Drawer.Screen name="MenuTab" component={TabNavigator} options={navOptionHandler} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} options={navOptionHandler} />
    </Drawer.Navigator>
  )
}

const StackApp = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StackApp.Navigator initialRouteName="Login">
        <StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler} />
        <StackApp.Screen name="Login" component={LoginScreen} options={navOptionHandler} />
        <StackApp.Screen name="Register" component={RegisterScreen} options={navOptionHandler} />
      </StackApp.Navigator>
    </NavigationContainer>
  );
}