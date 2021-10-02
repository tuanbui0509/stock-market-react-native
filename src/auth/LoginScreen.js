import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToken } from '../store/Token';



function LoginScreen(props) {
    const dispatch = useDispatch()
    // const Token = useSelector(state => state.Token)
    const Login = () => {
        dispatch(addToken())
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Login Screen!</Text>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={Login}
                >
                    <Text>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => props.navigation.navigate('Register')}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default LoginScreen
