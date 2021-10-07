import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import StatementScreen from '../../screens/users/Statement/StatementScreen';
import StatementScreenDetail from '../../screens/users/Statement/StatementScreenDetail';


const navOptionHandler = () => ({
  headerShown: false
})

const Stack = createStackNavigator()

function StatementStack({ navigation, route }) {
  return (
    <Stack.Navigator initialRouteName="Statement">
      <Stack.Screen name="Statement" component={StatementScreen} options={navOptionHandler} />
      <Stack.Screen name="StatementDetail" component={StatementScreenDetail} options={navOptionHandler} />
    </Stack.Navigator>
  )
}

export default StatementStack;
