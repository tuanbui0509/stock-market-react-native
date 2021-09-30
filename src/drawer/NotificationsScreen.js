import React, { Component } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import CustomHeader from '../components/CustomHeader'

function NotificationsScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="Notifications" navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Notifications Screen!</Text>
            </View>
        </SafeAreaView>
    )
}

export default NotificationsScreen
