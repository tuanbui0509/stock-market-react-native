import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DetailRegisterFormScreen from '../../screens/admin/DetailRegisterForm/DetailRegisterFormScreen';
import ManagementRegisterFormScreen from '../../screens/admin/ManagementRegisterForm/ManagementRegisterFormScreen';
const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function ManagementRegisterFormStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="ManagementRegisterFormScreen">
      <Stack.Screen name="ManagementRegisterFormScreen" component={ManagementRegisterFormScreen} options={navOptionHandler} />
      <Stack.Screen name="DetailRegisterFormScreen" component={DetailRegisterFormScreen} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default ManagementRegisterFormStack;
