import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import {
    Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import CustomHeader from '../../../components/CustomHeader';
import * as TextInfo from '../../../constants/Text';
import CustomInput from '../../../helpers/CustomInput';
import { Formik, Field } from 'formik'
import * as yup from 'yup'
import Color from '../../../constants/Colors'
const signUpValidationSchema = yup.object().shape({
    oldPassword: yup
        .string()
        //   .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        //   .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        //   .matches(/\d/, "Password must have a number")
        //   .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Mật khẩu ít nhất là ${min} ký tự`)
        .required('Mật khẩu cũ không được trống'),
    newPassword: yup
        .string()
        //   .matches(/\w*[a-z]\w*/,  "Password must have a small letter")
        //   .matches(/\w*[A-Z]\w*/,  "Password must have a capital letter")
        //   .matches(/\d/, "Password must have a number")
        //   .matches(/[!@#$%^&*()\-_"=+{}; :,<.>]/, "Password must have a special character")
        .min(8, ({ min }) => `Mật khẩu ít nhất là ${min} ký tự`)
        .required('Mật khẩu mới không được trống'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword')], 'Hai mật khẩu không giống nhau')
        .required('Xác nhận mật khẩu mới không được trống'),
})

const ChangePasswordScreen = ({ navigation, route }) => {
    const CurrentUser = route.params
    const [data, setData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const changeHandle = (values) => {
        console.log(data);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('=================change password================');
            setData({
                oldPassword: '',
                newPassword: '',
                confirmPassword: ''
            })
        });

        return unsubscribe;
    }, [navigation]);
    return (
        <View style={styles.container}>
            <CustomHeader title="" navigation={navigation} />
            <View style={styles.header}>
                <Text style={styles.text_header}>Đổi mật khẩu!</Text>
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
                                }]}>Mật khẩu cũ</Text>
                                <View style={styles.action}>

                                    <Field
                                        value={data.oldPassword}
                                        iconName='lock'
                                        component={CustomInput}
                                        name="oldPassword"
                                        placeholder="Nhập mật khẩu cũ"
                                        secureTextEntry
                                        onValueChange={(value) => setData({ ...data, oldPassword: value })}

                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    marginTop: 15
                                }]}>Mật khẩu mới</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        value={data.newPassword}
                                        name="newPassword"
                                        placeholder="Nhập mật khẩu mới"
                                        secureTextEntry
                                        onValueChange={(value) => setData({ ...data, newPassword: value })}

                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    marginTop: 15
                                }]}>Xác nhận lại mật khẩu mới</Text>
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
                                        placeholder="Xác nhận lại mật khẩu mới"
                                        secureTextEntry
                                        onValueChange={(value) => setData({ ...data, confirmPassword: value })}

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

export default ChangePasswordScreen;

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