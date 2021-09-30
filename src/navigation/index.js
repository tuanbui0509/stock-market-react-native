import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
// import AddTodo from '../screens/AddTodo'
// import EditTodo from '../screens/EditTodo'
// import ViewTodos from '../screens/ViewTodos'
// import Dashboard from '../screens/Dashboard'
// import RegisterScreen from '../screens/RegisterScreen'
// import LoginScreen from '../screens/LoginScreen'
// import StartScreen from '../screens/StartScreen'
// import ResetPasswordScreen from '../screens/ResetPasswordScreen'
import LoginScreen from '../auth/LoginScreen'
import RegisterScreen from '../auth/RegisterScreen'
import DrawerNavigator from '../drawer'

const navOptionHandler = () => ({
    headerShown: false
})

const StackApp = createStackNavigator()
export default function Navigation() {
    return (
        <NavigationContainer>
            <StackApp.Navigator initialRouteName="Login"
                screenOptions={{
                    // gestureEnabled: true,
                    headerShown: false,
                }}
            >
                <StackApp.Screen name="Login" component={LoginScreen} />
                <StackApp.Screen name="HomeApp" component={DrawerNavigator} />
                <StackApp.Screen name="Register" component={RegisterScreen} />
            </StackApp.Navigator>
        </NavigationContainer>
    )
}
