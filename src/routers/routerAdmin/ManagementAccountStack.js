import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManagementAccountScreen from '../../screens/admin/ManagementAccount/ManagementAccountScreen';
const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function ManagementAccountStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="ManagementAccount">
      <Stack.Screen name="ManagementAccount" component={ManagementAccountScreen} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default ManagementAccountStack;
