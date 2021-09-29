import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';



function LoginScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Login Screen!</Text>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => props.navigation.navigate('HomeApp')}
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
