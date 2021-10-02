import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SplashScreen from '../auth/SplashScreen'
import SignInScreen from '../auth/SignInScreen'
import DrawerNavigator from '../drawer'

import SignUpScreen from '../auth/SignUpScreen'

const navOptionHandler = () => ({
    headerShown: false
})



const StackApp = createStackNavigator()
export default function Navigation() {
    const dispatch = useDispatch();
    const Token = useSelector(state => state.Token);
    console.log(Token);
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
