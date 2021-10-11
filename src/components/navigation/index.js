import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SplashScreen from '../../screens/start/SplashScreen'
import SignInScreen from '../../screens/auth/SignInScreen'
import DrawerNavigator from '../../components/drawer'

import SignUpScreen from '../../screens/auth/SignUpScreen'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addToken } from '../../store/Token'
import axios from 'axios'
import { addUser } from '../../store/CurrentUser'

const navOptionHandler = () => ({
    headerShown: false
})



const StackApp = createStackNavigator()
export default function Navigation() {
    const dispatch = useDispatch()
    const Token = useSelector(state => state.Token)
    const isAdmin = useSelector(state => state.isAdmin)
    const CurrentUser = useSelector(state => state.CurrentUser)
    const getData = async () => {
        try {
            const value = await AsyncStorage.getItem('Token')
            const user = await AsyncStorage.getItem('user')
            // console.log('CurrentUser: ', CurrentUser);
            if (value !== null) {
                dispatch(addToken())
            } if (user) {
                dispatch(addUser(JSON.parse(user)))
            }
        } catch (error) {
            console.log(error);
        }
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <NavigationContainer>
            <StackApp.Navigator
                screenOptions={{
                    // gestureEnabled: true,
                    headerShown: false,
                }}
            >
                {Token ? (<StackApp.Screen name="HomeApp" component={DrawerNavigator} options={navOptionHandler} />) : (
                    <>
                        <StackApp.Screen name="SplashScreen" component={SplashScreen} />
                        <StackApp.Screen name="SignInScreen" component={SignInScreen} />
                        <StackApp.Screen name="SignUpScreen" component={SignUpScreen} />
                    </>
                )}

            </StackApp.Navigator>
        </NavigationContainer>
    )
}
