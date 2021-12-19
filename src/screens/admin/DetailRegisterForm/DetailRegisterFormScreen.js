

import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import * as Api from '../../../api/Admin';
import styleModal from '../../../common/styleModal';
import CustomHeader from '../../../components/CustomHeader';
import Color from '../../../constants/Colors';
import * as notification from '../../../helpers/Notification';
import { useFocusEffect } from '@react-navigation/core';
import { Overlay } from 'react-native-elements';


function DetailRegisterFormScreen(props) {
    const { colors } = useTheme();
    const { navigation, route } = props
    const user = route.params
    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [flag, setFlag] = useState(false)

    let value1 = new Date(user.ngaySinh)
    let value2 = new Date(user.ngayCapCmnd)
    let ngaySinh = format(value1, 'dd/MM/yyyy')
    let ngayCapCmnd = format(value2, 'dd/MM/yyyy')

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

        });
        return unsubscribe;
    }, [navigation]);

    const handleSubmit = async (flags) => {
        try {
            if (flags) {
                const res = await Api.ConfirmRegisterForm(user.maDon)
                if (res.data.status === 0) {
                    notification.SuccessNotification(res.data.message)
                    navigation.goBack()
                }
                else {
                    notification.DangerNotification(res.data.message)
                }
            } else {
                const res = await Api.DeleteRegisterForm(user.maDon)
                if (res.data.status === 0) {
                    notification.SuccessNotification("Hủy đơn thành công!")
                    navigation.goBack()
                }
                else {
                    notification.DangerNotification(res.data.message)
                }
            }
            setVisible(false)
        } catch (error) {
            notification.DangerNotification(error.data.message)
        }
    }



    const YourOwnComponent = () =>
        <View>
            <View>
                <Text style={{ ...styles.textTitleRBSheet, fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>
                    {flag ? 'Bạn có muốn xác nhận đơn không?' : 'Bạn có muốn hủy đơn không?'}</Text>
                <View style={styles.wrapperLabel}>
                    <TouchableOpacity onPress={() => handleSubmit(flag)}>
                        <LinearGradient
                            colors={['#F8495A', Color.red]}
                            style={{ ...styles.appButtonContainer, width: 120, marginRight: 20 }}
                        >
                            <Text style={styles.appButtonText}>Xác nhận</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(false)}>
                        <LinearGradient
                            colors={['#fff', '#fff']}
                            style={{ ...styles.appButtonContainer, width: 120 }}
                        >
                            <Text style={{ ...styles.appButtonText, color: '#333' }}>Đóng</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="" navigation={props.navigation} />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.text_header}>Xác nhận đơn đăng ký!</Text>
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
                        <View style={styles.content_wp}>
                            <View style={styles.box}>
                                <TouchableOpacity onPress={() => { setVisible(true); setFlag(true) }}>
                                    <LinearGradient
                                        colors={['#1BCC77', Color.green]}
                                        style={styles.appButtonContainer}>
                                        <Text style={styles.appButtonText}>Xác nhận</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.box}>
                                <TouchableOpacity onPress={() => { setVisible(true); setFlag(false) }}>
                                    <LinearGradient
                                        colors={['#F8495A', Color.red]}
                                        style={styles.appButtonContainer}
                                    >
                                        <Text style={styles.appButtonText}>Hủy</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </Animatable.View>
            </View>
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
            // overlayStyle={{ backgroundColor: 'transparent' }}
            >
                <YourOwnComponent />
            </Overlay>
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
    },
    content_wp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
        marginBottom: 10

    }, appButtonContainer: {
        // elevation: 10,
        borderRadius: 8,
        paddingVertical: 8,
        // height: 40,
        paddingHorizontal: 12,
        width: 150,
        fontSize: 14,
        borderWidth: 1,
        borderColor: '#d5d5d5',
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }, wrapperLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        marginBottom: 10
    }
});

export default DetailRegisterFormScreen