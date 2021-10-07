import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OrderScreen from '../../screens/users/Order/OrderScreen';
import OrderScreenDetail from '../../screens/users/Order/OrderScreenDetail';
const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function OrderStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Order">
      <Stack.Screen name="Order" component={OrderScreen} options={navOptionHandler} />
      <Stack.Screen name="OrderDetail" component={OrderScreenDetail} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default OrderStack;
