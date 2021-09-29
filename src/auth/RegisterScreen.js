import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomHeader from '../CustomHeader'


function RegisterScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Register" navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Register Screen!</Text>
            </View>
        </SafeAreaView>
    )
}

export default RegisterScreen
