import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import UserScreen from '../../screens/users/Account/AccountScreen';
import AccountScreenDetail from '../../screens/users/Account/AccountScreenDetail';


const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function UserStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="AccountScreen">
      <Stack.Screen name="AccountScreen" component={UserScreen} options={navOptionHandler} />
      <Stack.Screen name="AccountScreenDetail" component={AccountScreenDetail} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default UserStack;
