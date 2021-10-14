import React, { Component, useEffect, useState } from 'react'
import { Text, View, SafeAreaView, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import CustomHeader from '../CustomHeader'
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../constants/Colors'
import { format } from 'date-fns';
function InformationScreen(props) {
    const { colors } = useTheme();
    const [user, setUser] = useState('')
    useEffect(() => {
        const getUser = async () => {
            setUser(JSON.parse(await AsyncStorage.getItem('user')))
        }
        getUser()
    }, [])
    let ngaySinh, ngayCapCmnd
    if (user) {

        let value1 = new Date(user.ngaySinh)
        let value2 = new Date(user.ngayCapCmnd)
        ngaySinh = format(value1, 'dd/MM/yyyy')
        ngayCapCmnd = format(value2, 'dd/MM/yyyy')
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="" navigation={props.navigation} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Thông tin tài khoản!</Text>
                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={styles.footer}
                >
                    <ScrollView>
                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                                fontWeight: 'bold'
                            }]}>Họ và tên: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.ho} {user.ten}</Text>
                        </View>

                        {/* <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                fontWeight: 'bold',
                                color: colors.text,
                            }]}>Tên: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.ten}</Text>
                        </View> */}

                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Giới tính: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.phai ? 'Nam' : 'Nữ'}</Text>
                        </View>

                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Ngày sinh: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{ngaySinh}</Text>

                        </View>
                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Nơi sinh: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.noiSinh}</Text>
                        </View>

                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Địa chỉ: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.diaChi}</Text>
                        </View>

                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Email: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.email}</Text>
                        </View>
                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Số điện thoại: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.sdt}</Text>
                        </View>
                        <View style={styles.action}>

                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>CMND: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.cmnd}</Text>
                        </View>

                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Ngày cấp CMND: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{ngayCapCmnd}</Text>

                        </View>
                        <View style={styles.action}>
                            <Text style={[styles.text_footer, {
                                color: colors.text, fontWeight: 'bold',
                            }]}>Nơi cấp CMND: </Text>
                            <Text style={[styles.text_footer, {
                                color: colors.text,
                            }]}>{user.noiCapCmmd}</Text>
                        </View>

                    </ScrollView>
                </Animatable.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color
    },
    header: {
        // flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 70,
        paddingBottom: 30,
        paddingTop: 30
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginBottom: 10
    },
    action: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },
    pickedDate: {
        fontSize: 18,
        color: 'black',
    },
    btnContainer: {
        padding: 30,
    },
    // This only works on iOS
    datePicker: {
        width: 320,
        height: 260,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    styleSelect: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 1,
        height: 40,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderColor: 'gray',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    }
});

export default InformationScreen
