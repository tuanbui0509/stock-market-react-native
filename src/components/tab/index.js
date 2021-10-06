import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// import { IMAGE } from '../constants/Image';
import LightningTableStack from '../../routers/LightningTableStack';
import OrderStack from '../../routers/OrderStack';
import StatementStack from '../../routers/StatementStack';
import UserStack from '../../routers/UserStack';

const navOptionHandler = () => ({
    headerShown: false
})

const Tab = createBottomTabNavigator()
function TabNavigator() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Users" component={UserStack}
                // options={navOptionHandler} 
                options={{
                    tabBarLabel: 'Khách hàng',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-person" color={color} size={26} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen name="Lightning-tables" component={LightningTableStack}
                options={{
                    tabBarLabel: 'Thị trường',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-bar-chart-sharp" color={color} size={26} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen name="Statements" component={StatementStack} options={navOptionHandler}

                options={{
                    tabBarLabel: 'Sổ lệnh',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="ios-reader" color={color} size={26} />
                    ),
                    headerShown: false
                }}
            />
            <Tab.Screen name="Orders" component={OrderStack}
                options={{
                    tabBarLabel: 'Đặt lệnh',
                    tabBarColor: '#1f65ff',
                    tabBarIcon: ({ color }) => (
                        <Icon name="md-construct-sharp" color={color} size={26} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    )
}
export default TabNavigator