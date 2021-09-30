import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import StatementScreen from '../screens/Statement/StatementScreen';
import StatementScreenDetail from '../screens/Statement/StatementScreenDetail';


const navOptionHandler = () => ({
  headerShown: false
})

const StackStatement = createStackNavigator()

function StatementStack({ navigation, route }) {
  return (
    <StackStatement.Navigator initialRouteName="Statement">
      <StackStatement.Screen name="Statement" component={StatementScreen} options={navOptionHandler} />
      <StackStatement.Screen name="StatementDetail" component={StatementScreenDetail} options={navOptionHandler} />
    </StackStatement.Navigator>
  )
}

export default StatementStack;
