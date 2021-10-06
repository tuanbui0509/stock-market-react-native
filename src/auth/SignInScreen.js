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
import { addToken } from '../store/Token';

import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ApiAuthentication from '../api/Auth'
import axios from 'axios';

const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const isToken = useSelector(state => state.Token)

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    const { colors } = useTheme();

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

    const loginHandle = async (userName, password) => {

        // const foundUser = Users.filter(item => {
        //     return userName == item.username && password == item.password;
        // });

        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('Lỗi đăng nhập!', 'Tài khoản hoặc mật khẩu không được trống.', [
                { text: 'Trở lại' }
            ]);
            return;
        }

        // if (foundUser.length == 0) {
        //     Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        //         { text: 'Okay' }
        //     ]);
        //     return;
        // }
        console.log('login');
        await AsyncStorage.setItem('Token', 'tuanbui0509')
        dispatch(addToken())
        try {

            const res = await ApiAuthentication.login({ userName: userName, password: password });
            console.log(res.data);
            if (res.data) {
            }
            else {
            }
            axios.post('https://localhost:5001/api/DangNhap', JSON.stringify({ userName: userName, password: password }))
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content" />
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
                        {data.check_textInputChange ?
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
                    {data.isValidUser ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            {/* <Text style={styles.errorMsg}>Username must be 4 characters long.</Text> */}
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
                            secureTextEntry={data.secureTextEntry ? true : false}
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => handlePasswordChange(val)}
                        />
                        <TouchableOpacity
                            onPress={updateSecureTextEntry}
                        >
                            {data.secureTextEntry ?
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
                    {data.isValidPassword ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            {/* <Text style={styles.errorMsg}>Password must be 8 characters long.</Text> */}
                        </Animatable.View>
                    }


                    <TouchableOpacity>
                        <Text style={{ color: '#009387', marginTop: 15 }}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <View style={styles.button}>
                        <TouchableOpacity
                            style={styles.signIn}
                            onPress={() => { loginHandle(data.username, data.password) }}
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
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
                                borderColor: '#009387',
                                borderWidth: 1,
                                marginTop: 15
                            }]}
                        >
                            <Text style={[styles.textSign, {
                                color: '#009387'
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
        backgroundColor: '#009387'
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
