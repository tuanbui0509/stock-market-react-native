import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManagementRegisterFormScreen from '../../screens/admin/ManagementRegisterForm/ManagementRegisterFormScreen';
const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function ManagementRegisterFormStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="ManagementRegisterForm">
      <Stack.Screen name="ManagementRegisterForm" component={ManagementRegisterFormScreen} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default ManagementRegisterFormStack;
