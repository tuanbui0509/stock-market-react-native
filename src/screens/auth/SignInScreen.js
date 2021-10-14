import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { LinearGradient } from 'expo-linear-gradient';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';

import { useTheme } from 'react-native-paper';
import { addToken } from '../../store/Token';
import { addUser } from '../../store/CurrentUser';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ApiAuthentication from '../../api/Auth'
import Color from '../../constants/Colors'

import { isAdmin } from '../../store/isAdmin';
const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const isToken = useSelector(state => state.Token)
    const CurrentUser = useSelector(state => state.CurrentUser)

    const [acc, setAcc] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if (val.trim().length >= 1) {
            setAcc({
                ...acc,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setAcc({
                ...acc,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 1) {
            setAcc({
                ...acc,
                password: val,
                check_textInputChange: true,
                isValidPassword: true
            });
        } else {
            setAcc({
                ...acc,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setAcc({
            ...acc,
            secureTextEntry: !acc.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 1) {
            setAcc({
                ...acc,
                isValidUser: true
            });
        } else {
            setAcc({
                ...acc,
                isValidUser: false
            });
        }
    }

    const loginHandle = async () => {
        if (acc.username.length == 0 && acc.password.length == 0) {
            setAcc({
                ...acc,
                isValidUser: false,
                isValidPassword: false,
            });
            return;
        }
        else if (acc.username.length == 0) {
            setAcc({
                ...acc,
                isValidUser: false,
            });
            return;
        }
        else if (acc.password.length == 0) {
            setAcc({
                ...acc,
                isValidPassword: false,
            });
            return;
        }
        if (!acc.isValidPassword || !acc.isValidUser) {
            return;
        }
        try {
            const res = await ApiAuthentication.login({ username: acc.username, password: acc.password });
            let { data } = res.data
            if (res.data.status === 0) {
                await AsyncStorage.setItem('Token', data.token)
                await AsyncStorage.setItem('user', JSON.stringify(data.user))
                dispatch(addToken())
                dispatch(addUser(data.user))
                Alert.alert('Thành công!', res.data.message, [
                    { text: 'Xác nhận' }
                ]);
                if (data.role === 'admin') {
                    dispatch(isAdmin());
                }

            }
            else {
                console.log(res.data.message);
            }

        } catch (err) {
            Alert.alert('Lỗi đăng nhập!', err.data.message, [
                { text: 'Trở lại' }
            ]);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Color.bg_color} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>Chào mừng đến với NTNT!</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView>
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>Tài khoản</Text>
                    <View style={styles.action}>
                        <FontAwesome
                            name="user-o"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Tài khoản của bạn"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => textInputChange(val)}
                            onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                        />
                        {acc.check_textInputChange ?
                            <Animatable.View
                                animation="bounceIn"
                            >
                                <Feather
                                    name="check-circle"
                                    color="green"
                                    size={20}
                                />
                            </Animatable.View>
                            : null}
                    </View>
                    {acc.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Tài khoản không được để trống.</Text>
                        </Animatable.View>
                    }


                    <Text style={[styles.text_footer, {
                        color: colors.text,
                        marginTop: 35
                    }]}>Mật khẩu</Text>
                    <View style={styles.action}>
                        <Feather
                            name="lock"
                            color={colors.text}
                            size={20}
                        />
                        <TextInput
                            placeholder="Mật khẩu của bạn"
                            placeholderTextColor="#666666"
                            secureTextEntry={acc.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {acc.secureTextEntry ?
                                <Feather
                                    name="eye-off"
                                    color="grey"
                                    size={20}
                                />
                                :
                                <Feather
                                    name="eye"
                                    color="grey"
                                    size={20}
                                />
                            }
                        </TouchableOpacity>
                    </View>
                    {acc.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Mật khẩu không được để trống.</Text>
                        </Animatable.View>
                    }


                    <TouchableOpacity>
                        <Text style={{ color: Color.bg_color, marginTop: 15 }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={loginHandle}
                        >
                            <LinearGradient
                                colors={[Color.btn_color, Color.bg_color]}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, {
                                    color: '#fff'
                                }]}>Đăng nhập</Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('SignUpScreen')}
                            style={[styles.signIn, {
                                borderColor: Color.bg_color,
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: Color.bg_color
                            }]}>Đăng ký</Text>
                        </TouchableOpacity>
                    </View>
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
        flex: 3,
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
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
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
    logo: {
        // width: height_logo,
        // height: height_logo,
        borderRadius: 10
    },
});
