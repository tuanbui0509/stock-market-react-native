import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserScreen from '../screens/User/UserScreen';
import UserScreenDetail from '../screens/User/UserScreenDetail';


const navOptionHandler = () => ({
  headerShown: false
})

const StackUser = createStackNavigator()

function UserStack({ navigation, route }) {
  return (
    <StackUser.Navigator initialRouteName="User">
      <StackUser.Screen name="User" component={UserScreen} options={navOptionHandler} />
      <StackUser.Screen name="UserDetail" component={UserScreenDetail} options={navOptionHandler} />
    </StackUser.Navigator>
  )
}

export default UserStack;
