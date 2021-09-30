import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { IMAGE } from '../constants/Image';
import LightningTableStack from '../routers/LightningTableStack';
import OrderStack from '../routers/OrderStack';
import StatementStack from '../routers/StatementStack';
import UserStack from '../routers/UserStack';

const navOptionHandler = () => ({
    headerShown: false
})

const Tab = createBottomTabNavigator()
function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Users') {
                        iconName = focused
                            ? IMAGE.ICON_USER
                            : IMAGE.ICON_USER_COLOR;
                    } else if (route.name === 'Lightning-tables') {
                        iconName = focused ?
                            IMAGE.ICON_TREND
                            : IMAGE.ICON_TREND_COLOR;
                    }
                    else if (route.name === 'Statements') {
                        iconName = focused ?
                            IMAGE.ICON_STATEMENT
                            : IMAGE.ICON_STATEMENT_COLOR;
                    }
                    else if (route.name === 'Orders') {
                        iconName = focused ?
                            IMAGE.ICON_MACE
                            : IMAGE.ICON_MACE_COLOR;
                    }
                    // You can return any component that you like here!
                    return <Image source={iconName} style={{ width: 20, height: 20 }}
                        resizeMode="contain" />;
                },
            })}
            // tabBarOptions={{
            //     activeTintColor: 'red',
            //     inactiveTintColor: 'black',
            // }}
        >
            <Tab.Screen name="Users" component={UserStack} options={navOptionHandler} />
            <Tab.Screen name="Lightning-tables" component={LightningTableStack} options={navOptionHandler} />
            <Tab.Screen name="Statements" component={StatementStack} options={navOptionHandler} />
            <Tab.Screen name="Orders" component={OrderStack} options={navOptionHandler} />
        </Tab.Navigator>
    )
}
export default TabNavigator