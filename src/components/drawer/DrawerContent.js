import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import {
    Avatar, Caption, Drawer, Title
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../../store/CurrentUser';
import { removeAdmin } from '../../store/isAdmin';
import { removeToken } from '../../store/Token';

export function DrawerContent(props) {

    const dispatch = useDispatch()
    const Token = useSelector(state => state.Token)
    const isAdmin = useSelector(state => state.isAdmin)
    const CurrentUser = useSelector(state => state.CurrentUser)
    const [Loading, setLoading] = useState(false)

    const Logout = async () => {
        await AsyncStorage.removeItem('Token')
        await AsyncStorage.removeItem('user')
        dispatch(removeToken())
        dispatch(removeAdmin())
        dispatch(removeUser())
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
    // console.log(CurrentUser);
    // console.log('====================================');
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <Avatar.Image
                                source={require('../../images/ntnt_mobile.png')}
                                size={60}
                            />
                            <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                <Title style={styles.title}>Bùi Ngọc Tuấn</Title>
                                {isAdmin ? null : <Caption style={styles.caption}>200.000.000đ</Caption>}
                            </View>
                        </View>
                    </View>
                    {isAdmin ?
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="ios-person-sharp"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Danh sách đơn đăng ký"
                                onPress={() => { props.navigation.navigate('Users') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="ios-card-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Danh sách nhà đầu tư"
                                onPress={() => { props.navigation.navigate('Users') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="ios-key-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Danh sách cổ phiếu"
                                onPress={() => { props.navigation.navigate('BookmarkScreen') }}
                            />
                        </Drawer.Section> :
                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="person-circle-sharp"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Thông tin khách hàng"
                                onPress={() => { props.navigation.navigate('InformationScreen') }}
                            />
                            {/* <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="ios-card-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Danh sách tài khoản"
                                onPress={() => { props.navigation.navigate('Users') }}
                            /> */}
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="ios-key-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Đổi mật khẩu"
                                onPress={() => { props.navigation.navigate('ChangePasswordScreen') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="finger-print-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Đổi mã PIN"
                                onPress={() => { props.navigation.navigate('ChangePinScreen') }}
                            />
                            <DrawerItem
                                icon={({ color, size }) => (
                                    <Icon
                                        name="cash-outline"
                                        color={color}
                                        size={size}
                                    />
                                )}
                                label="Ứng trước tiền bán"
                                onPress={() => { props.navigation.navigate('AdvanceMoneyScreen') }}
                            />

                        </Drawer.Section>
                    }

                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({ color, size }) => (
                        <Icon
                            name="md-enter-outline"
                            color={color}
                            size={size}
                        />
                    )}
                    label="Đăng xuất"
                    onPress={LogoutAlertHandler}
                />
            </Drawer.Section>
        </View>
    );
}

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