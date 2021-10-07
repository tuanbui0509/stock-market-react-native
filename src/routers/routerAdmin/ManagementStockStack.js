import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ManagementStockScreen from '../../screens/admin/ManagementStock/ManagementStockScreen';
const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function ManagementStockStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="ManagementStock">
      <Stack.Screen name="ManagementStock" component={ManagementStockScreen} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default ManagementStockStack;
