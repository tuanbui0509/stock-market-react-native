import { LinearGradient } from 'expo-linear-gradient';
import { Field, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import * as yup from 'yup';
import * as Api from '../../../api/Account';
import CustomHeader from '../../../components/CustomHeader';
import Color from '../../../constants/Colors';
import CustomInput from '../../../helpers/CustomInput';
import * as notification from '../../../helpers/Notification';

const signUpValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        //   .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        //   .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        .matches(/\d/, "Password must have a number")
        //   .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(6, ({ min }) => `Mã Pin ít nhất là ${min} ký tự`)
        .required('Mã Pin cũ không được trống'),
    newPassword: yup
        .string()
        //   .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        //   .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        //   .matches(/\d/, "Password must have a number")
        //   .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(6, ({ min }) => `Mã Pin ít nhất là ${min} ký tự`)
        .required('Mã Pin mới không được trống'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Hai Mã Pin không giống nhau')
        .required('Xác nhận Mã Pin mới không được trống'),
})

const ChangePinScreen = ({ navigation, route }) => {
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const changeHandle = async (values) => {
        try {
            const res = await Api.ChangePin({ oldPassword: data.oldPassword, newPassword: data.newPassword })
            if (res.data.status === 400) {
                notification.DangerNotification(res.data.message)
            }
            else {
                notification.SuccessNotification(res.data.message)
                setTimeout(() => {
                    navigation.replace('HomeApp')
                }, 1000);
            }
        } catch (error) {
            notification.DangerNotification(error.data.message)
        }
    }

    useEffect(() => {
        const backAction = () => {
            Alert.alert("Thoát chức năng!", `Bạn có muốn thoát không?`, [
                {
                    text: "Hủy",
                    onPress: () => null,
                    style: "cancel"
                },
                { text: "Thoát", onPress: () => navigation.replace('HomeApp') }
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <CustomHeader title="" navigation={navigation} />
            <View style={styles.header}>
                <Text style={styles.text_header}>Đổi Mã Pin!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>

                    <Formik
                        initialValues={{
                            oldPassword: '',
                            newPassword: '',
                            confirmPassword: ''
                        }}
                        validationSchema={signUpValidationSchema}
                        onSubmit={changeHandle}
                    >
                        {({ handleSubmit, isValid }) => (
                            <>
                                <Text style={[styles.text_footer, {
                                    marginTop: 10
                                }]}>Mã Pin cũ</Text>
                                <View style={styles.action}>

                                    <Field
                                        // value={data.oldPassword}
                                        iconName='lock'
                                        component={CustomInput}
                                        name="oldPassword"
                                        placeholder="Nhập Mã Pin cũ"
                                        secureTextEntry
                                        onValueChange={(value) => setData({ ...data, oldPassword: value })}
                                        keyboardType='numeric'
                                        maxLength={6}

                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    marginTop: 15
                                }]}>Mã Pin mới</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        value={data.newPassword}
                                        name="newPassword"
                                        placeholder="Nhập Mã Pin mới"
                                        secureTextEntry
                                        onValueChange={(value) => setData({ ...data, newPassword: value })}
                                        keyboardType='numeric'
                                        maxLength={6}
                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    marginTop: 15
                                }]}>Xác nhận lại Mã Pin mới</Text>
                                <View style={styles.action}>
                                    {/* <Feather
                                        name="lock"
                                        color="#05375a"
                                        size={20}
                                    /> */}

                                    <Field
                                        value={data.confirmPassword}
                                        component={CustomInput}
                                        name="confirmPassword"
                                        placeholder="Xác nhận lại Mã Pin mới"
                                        secureTextEntry
                                        onValueChange={(value) => setData({ ...data, confirmPassword: value })}
                                        keyboardType='numeric'
                                        maxLength={6}
                                    />
                                </View>

                                <View style={styles.button}>
                                    <TouchableOpacity
                                        onPress={handleSubmit}
                                        style={[styles.signIn, {
                                            borderColor: '#009387',
                                            borderWidth: 1,
                                            backgroundColor: Color.bg_color

                                        }]}
                                    >
                                        <LinearGradient
                                            colors={[Color.btn_color, Color.bg_color]}
                                            style={styles.signIn}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>Xác nhận</Text>
                                        </LinearGradient>

                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </Formik>







                    {/* <View style={styles.textPrivate}>
                        <Text style={styles.color_textPrivate}>
                            By signing up you agree to our
                        </Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Terms of service</Text>
                        <Text style={styles.color_textPrivate}>{" "}and</Text>
                        <Text style={[styles.color_textPrivate, { fontWeight: 'bold' }]}>{" "}Privacy policy</Text>
                    </View> */}

                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default ChangePinScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.bg_color
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: Platform.OS === 'ios' ? 3 : 5,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    errorMsg: {
        paddingTop: 10,
        color: '#FF0000',
        fontSize: 14,
        textAlign: 'center'
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
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
        marginTop: 30
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
        fontWeight: 'bold',
        color: '#fff'
    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    }
});