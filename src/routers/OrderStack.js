import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import OrderScreen from '../screens/Order/OrderScreen';
import OrderScreenDetail from '../screens/Order/OrderScreenDetail';
const navOptionHandler = () => ({
  headerShown: false
})

const StackOrder = createStackNavigator()

function OrderStack({ navigation, route }) {
  return (
    <StackOrder.Navigator initialRouteName="Order">
      <StackOrder.Screen name="Order" component={OrderScreen} options={navOptionHandler} />
      <StackOrder.Screen name="OrderDetail" component={OrderScreenDetail} options={navOptionHandler} />
    </StackOrder.Navigator>
  )
}

export default OrderStack;
