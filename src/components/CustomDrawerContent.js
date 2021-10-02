import React, { Component } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE } from '../constants/Image'
import { removeToken } from '../store/Token';
function CustomDrawerContent(props) {
    let { navigation } = props
    const dispatch = useDispatch()
    const Token = useSelector(state => state.Token)

    const Logout = () => {
        dispatch(removeToken())
    }

    const LogoutAlertHandler = () => {
        //function to make two option alert
        Alert.alert(
            //title
            'Đăng xuất',
            //body
            'Bạn có muốn đăng xuất không ?',
            [
                { text: 'Có', onPress: Logout },
                {
                    text: 'Không',
                    onPress: () => console.log('No Pressed'),
                    style: 'cancel',
                },
            ],
            { cancelable: false }
            //clicking out side of alert will not cancel
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 150, alignItems: 'center', justifyContent: 'center' }}>
                <Image source={IMAGE.ICON_LOGO}
                    style={{ height: 120, width: 120, borderRadius: 60 }}
                />
            </View>
            <ScrollView style={{ marginLeft: 5 }}>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('MenuTab')}
                >
                    <Text>Menu Tab</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('Notifications')}
                >
                    <Text>Notifications</Text>
                </TouchableOpacity>
            </ScrollView>

            <TouchableOpacity
                style={{ marginTop: 20, marginLeft: 5 }}
                onPress={LogoutAlertHandler}
            >
                <Text>Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}




export default CustomDrawerContent

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
