import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Field, Formik } from 'formik';
import moment from 'moment';
import React from 'react';
import {
    Alert, Platform, ScrollView,
    StatusBar, StyleSheet, Text, TouchableOpacity, View
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTheme } from 'react-native-paper';
import * as yup from 'yup';
import * as ApiAuthentication from '../../api/Auth';
import CustomDatePicker from '../../components/CustomDatePicker';
import CustomInput from '../../helpers/CustomInput';
import Color from '../../constants/Colors'


const signUpValidationSchema = yup.object().shape({
    ho: yup
        .string()
        .matches(/[a-zA-Z]/, 'Chỉ nhập chữ không nhập số và ký tự đặt biệt')
        .required('Vui lòng nhập Họ'),
    ten: yup
        .string()
        .matches(/[a-zA-Z]/, 'Chỉ nhập chữ không nhập số và ký tự đặt biệt')
        .required('Vui lòng nhập Tên'),
    sdt: yup
        .string()
        .matches(/(09)(\d){8}\b/, 'Định dạng số điện thoại không hợp lệ')
        .required('Vui lòng nhập số điện thoại'),
    email: yup
        .string()
        .email("Định dạng Email không hợp lệ")
        .required('Vui lòng nhập địa chỉ email'),
    noiSinh: yup
        .string()
        .required('Vui lòng nhập nơi sinh'),
    diaChi: yup
        .string()
        .required('Vui lòng nhập địa chỉ'),
    cmnd: yup
        .string()
        .required('Vui lòng nhập CMND'),
    noiCapCMMD: yup
        .string()
        .required('Vui lòng nhập nơi cấp CMND'),
    phai: yup
        .boolean()
        .required('Vui lòng chọn giới tính')
})

const SignInScreen = ({ navigation }) => {

    const [data, setData] = React.useState({
        ho: '',
        ten: '',
        ngaySinh: moment(),
        sdt: '',
        email: '',
        phai: '',
        noiSinh: '',
        diaChi: '',
        cmnd: '',
        noiCapCMMD: '',
        ngayCapCMND: moment()

    });
    const { colors } = useTheme();
    const onSubmit = async (values) => {
        console.log('data: ', data);
        // console.log('value: ', values);
        try {
            const res = await ApiAuthentication.register(data);
            console.log('====================================');
            console.log(res.data);
            console.log('====================================');
            if (res.data.status === 0) {
                Alert.alert('Thành công!', res.data.message, [
                    { text: 'Xác nhận' }
                ]);
                navigation.goBack()

            }
            else {
                console.log('====================================');
                console.log(res.data.message);
                console.log('====================================');

            }

        } catch (err) {
            console.log(err.data);
            Alert.alert('Lỗi đăng nhập!', err.data.message, [
                { text: 'Trở lại' }
            ]);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Color.bg_color} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Đăng ký tài khoản!</Text>
            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <ScrollView>

                    <Formik
                        initialValues={data}
                        onSubmit={onSubmit}
                        validationSchema={signUpValidationSchema}
                    >
                        {({ handleSubmit, isValid }) => (
                            <>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Họ:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="ho"
                                        placeholder="Họ của bạn"
                                        onValueChange={(value) => setData({ ...data, ho: value })}
                                    />
                                </View>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Tên:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="ten"
                                        placeholder="Tên của bạn"
                                        onValueChange={(value) => setData({ ...data, ten: value })}

                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Giới tính:</Text>
                                <View style={styles.action}>
                                    <View style={styles.styleSelect}>
                                        <Picker
                                            name='phai'
                                            selectedValue={data.phai}
                                            onValueChange={(itemValue) => setData({ ...data, phai: itemValue })}
                                        >
                                            <Picker.Item label="Chọn giới tính" value='' />
                                            <Picker.Item label="Nam" value={true} />
                                            <Picker.Item label="Nữ" value={false} />
                                        </Picker>
                                    </View>
                                </View>

                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Ngày sinh</Text>
                                <View style={styles.action}>
                                    {/* <CustomDatePicker
                                        name="ngaySinh"
                                        onDateChange={(value) => setData({ ...data, ngaySinh: value })}
                                    /> */}
                                    <Field
                                        component={CustomDatePicker}
                                        name="ngaySinh"
                                        onDateChange={(value) => setData({ ...data, ngaySinh: value })}
                                    // placeholder=""
                                    />
                                </View>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Nơi sinh của bạn:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="noiSinh"
                                        placeholder="Nơi sinh của bạn"
                                        onValueChange={(value) => setData({ ...data, noiSinh: value })}

                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Địa chỉ của bạn:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="diaChi"
                                        placeholder="Địa chỉ của bạn"
                                        onValueChange={(value) => setData({ ...data, diaChi: value })}

                                    />
                                </View>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Email:</Text>

                                <View style={styles.action}>

                                    <Field
                                        component={CustomInput}
                                        name="email"
                                        placeholder="Email của bạn"
                                        keyboardType="email-address"
                                        onValueChange={(value) => setData({ ...data, email: value })}

                                    />

                                </View>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Số điện thoại:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="sdt"
                                        placeholder="Số điện thoại của bạn"
                                        keyboardType="numeric"
                                        onValueChange={(value) => setData({ ...data, sdt: value })}

                                    />
                                </View>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>CMND:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="cmnd"
                                        placeholder="CMND của bạn"
                                        keyboardType="numeric"
                                        onValueChange={(value) => setData({ ...data, cmnd: value })}

                                    />
                                </View>

                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Ngày cấp CMND:</Text>
                                <View style={styles.action}>
                                    {/* <CustomDatePicker
                                        name="ngayCapCMMD"
                                        onDateChange={(value) => setData({ ...data, ngayCapCMND: value })}
                                    /> */}
                                    <Field
                                        component={CustomDatePicker}
                                        name="ngayCapCMND"
                                        onDateChange={(value) => setData({ ...data, ngayCapCMND: value })}
                                    // placeholder=""
                                    />
                                </View>
                                <Text style={[styles.text_footer, {
                                    color: colors.text,
                                }]}>Nơi cấp CMND:</Text>
                                <View style={styles.action}>
                                    <Field
                                        component={CustomInput}
                                        name="noiCapCMMD"
                                        placeholder="Nơi cấp CMND"
                                        onValueChange={(value) => setData({ ...data, noiCapCMMD: value })}

                                    />
                                </View>



                                <View style={styles.button}>
                                    <TouchableOpacity
                                        style={styles.signIn}
                                        onPress={handleSubmit}
                                    >
                                        <LinearGradient
                                            colors={['#08d4c4', Color.bg_color]}
                                            style={styles.signIn}
                                        >
                                            <Text style={[styles.textSign, {
                                                color: '#fff'
                                            }]}>Đăng ký</Text>
                                        </LinearGradient>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => navigation.replace('SignInScreen')}
                                        style={[styles.signIn, {
                                            borderColor: Color.bg_color,
                                            borderWidth: 1,
                                            marginTop: 15
                                        }]}
                                    >
                                        <Text style={[styles.textSign, {
                                            color: Color.bg_color
                                        }]}>Đăng nhập</Text>
                                    </TouchableOpacity>
                                </View>

                            </>
                        )}
                    </Formik>


                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default SignInScreen;

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
        // flexDirection: 'row',
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
