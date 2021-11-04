import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import ManagementAccountStack from '../../routers/routerAdmin/ManagementAccountStack';
import ManagementRegisterFormStack from '../../routers/routerAdmin/ManagementRegisterFormStack';
import ManagementStockStack from '../../routers/routerAdmin/ManagementStockStack';

// import { IMAGE } from '../constants/Image';
import LightningTableStack from '../../routers/routerUser/LightningTableStack';
import OrderStack from '../../routers/routerUser/OrderStack';
import StatementStack from '../../routers/routerUser/StatementStack';
import UserStack from '../../routers/routerUser/UserStack';

const navOptionHandler = () => ({
    headerShown: false
})

const Tab = createBottomTabNavigator()
function TabNavigator() {
    const dispatch = useDispatch()
    const isAdmin = useSelector(state => state.isAdmin)
    return (
        <Tab.Navigator >
            {isAdmin ?
                <>
                    <Tab.Screen name="ManagementRegisterForms" component={ManagementRegisterFormStack}
                        // options={navOptionHandler} 
                        options={{
                            tabBarLabel: 'QL Đơn đăng ký',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="ios-person" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="ManagementStocks" component={ManagementStockStack}
                        options={{
                            tabBarLabel: 'QL Cỗ phiếu',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="md-bar-chart-sharp" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="ManagementAccounts" component={ManagementAccountStack} options={navOptionHandler}

                        options={{
                            tabBarLabel: 'QL Nhà đầu tư',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="ios-reader" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                    {/* <Tab.Screen name="Orders" component={OrderStack}
                        options={{
                            tabBarLabel: 'Đặt lệnh',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="md-construct-sharp" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    /> */}
                </> :
                <>
                    <Tab.Screen name="Users" component={UserStack}
                        // options={navOptionHandler} 
                        options={{
                            tabBarLabel: 'Khách hàng',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="ios-person" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="Lightning-tables" component={LightningTableStack}
                        options={{
                            tabBarLabel: 'Thị trường',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="bar-chart" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="Statements" component={StatementStack} options={navOptionHandler}

                        options={{
                            tabBarLabel: 'Sổ lệnh',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="ios-reader" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                    <Tab.Screen name="Orders" component={OrderStack}
                        options={{
                            tabBarLabel: 'Đặt lệnh',
                            tabBarColor: '#37C2D0',
                            tabBarIcon: ({ color }) => (
                                <Icon name="hammer" color={color} size={26} />
                            ),
                            headerShown: false
                        }}
                    />
                </>}
        </Tab.Navigator>
    )
}
export default TabNavigator