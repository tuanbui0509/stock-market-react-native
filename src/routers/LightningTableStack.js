import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LightningTableScreen from '../screens/LightningTable/LightningTableScreen';
const navOptionHandler = () => ({
  headerShown: false
})

const StackLightningTable = createStackNavigator()

function LightningTableStack({ navigation, route }) {
  return (
    <StackLightningTable.Navigator initialRouteName="LightningTable">
      <StackLightningTable.Screen name="LightningTable" component={LightningTableScreen} options={navOptionHandler} />

    </StackLightningTable.Navigator>
  )
}

export default LightningTableStack;
