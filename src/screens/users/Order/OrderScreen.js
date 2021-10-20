import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as ApiLT from '../../../api/LightningTable';
import * as ApiUser from '../../../api/Account';
import Color from '../../../constants/Colors';
import Formatter from '../../../helpers/formatNumber'
import * as Price from '../../../constants/Price';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';

const OrderScreen = ({ navigation }) => {
    //Data Source for the SearchableDropdown
    const [serverData, setServerData] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});
    const [BankAccount, setBankAccount] = useState([])
    const [order, setOrder] = useState({
        stk: "",
        maCp: "",
        gia: 0,
        soLuong: 0,
        mkdatLenh: "",
        loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
        loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
    });
    const [currentAccount, setCurrentAccount] = useState({})
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchBankAccount = async () => {
                const res = await ApiUser.MyBankAccount()
                setBankAccount(res.data)
            }
            const fetchApi = async () => {
                const res = await ApiLT.LightningTable()
                setServerData(res.data);
                // setSelectedItems([])
            }
            fetchBankAccount()
            fetchApi()
        });

        return unsubscribe;
    }, [navigation]);
    console.log(order);
    const showStatusPicker = BankAccount?.map((item, index) => {
        const value = item.nganHang.tenNganHang + ' - ' + item.stk.trim()
        return (
            <Picker.Item key={index} label={value} value={item.stk.trim()} />
        )
    })
    const handleSelectItem = (item) => {
        setOrder({ ...order, maCp: item.macp })
        setSelectedItems(item)
    }
    const handleChooseBuy = () => {
        setOrder({ ...order, loaiGiaoDich: true })
    }
    const handleChooseSell = () => {
        setOrder({ ...order, loaiGiaoDich: false })
    }

    return (
        <>
            <CustomHeader title="Đặt lệnh" isHome={true} navigation={navigation} />
            <SafeAreaView style={styles.container}>
                <View>
                    <View style={styles.box_stk}>
                        <View style={styles.textStyle}>
                            <Picker
                                selectedValue={order.stk}
                                onValueChange={(itemValue) => setOrder({ ...order, stk: itemValue })} >
                                {showStatusPicker}
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.textSelect}>
                        <SearchableDropdown
                            selectedItems={selectedItems}
                            onTextChange={(text) => setOrder({ ...order, maCp: text })}
                            onItemSelect={handleSelectItem}
                            containerStyle={{ padding: 5 }}
                            textInputStyle={{
                                paddingVertical: 9,
                                paddingHorizontal: 12,
                                height: 42,
                                width: '90%',
                                marginLeft: 10,
                                borderWidth: StyleSheet.hairlineWidth,
                                borderRadius: 5,
                                fontSize: 18,
                                fontWeight: 'bold'
                            }}
                            itemStyle={{
                                paddingVertical: 9,
                                paddingHorizontal: 12,
                                height: 42,
                                width: '90%',
                                borderWidth: 1,
                                borderColor: '#e5e5e5',
                                marginLeft: 10,
                                fontSize: 18,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,

                            }}
                            itemTextStyle={{
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                maxHeight: '70%',
                            }}
                            items={serverData}
                            placeholder="Tìm mã cổ phiếu"
                            resetValue={false}
                            underlineColorAndroid="transparent"
                            setSort={(item, searchedText) => item.macp.trim().toLowerCase().startsWith(searchedText.toLowerCase())}
                        />
                    </View>
                </View>
                <ScrollView>
                    <View style={{ ...styles.content_wp, borderBottomWidth: 1 }}>
                        <View style={styles.box_cp}>
                            <Text style={{ fontSize: 24 }}>Giá: 23.05</Text>
                            <Text style={styles.textTitle}>KL: 230,5</Text>
                        </View>
                        <View style={styles.box_cp}>
                            <Text style={{ ...styles.textTitle, color: Color.ceil }}>Trần: 23.05</Text>
                            <Text style={{ ...styles.textTitle, color: Color.floor }}>Sàn: 20,5</Text>
                            <Text style={{ ...styles.textTitle, color: Color.standard }}>TC: 21,5</Text>
                        </View>
                    </View>
                    <View style={styles.content_wp}>
                        <View style={styles.box}>
                            <Text style={styles.textTitle}>Số dư tài khoản</Text>
                            <Text style={{ ...styles.textTitle, fontWeight: 'bold' }}>1,4444,444,444</Text>
                        </View>
                    </View>
                    <View style={styles.content_wp}>
                        <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={styles.textTitle}>Khối lượng</Text>
                            <TextInput
                                name="soLuong"
                                style={{ ...styles.textInput, width: '100%', marginLeft: 0 }}
                                onChangeText={text => setOrder({ ...order, soLuong: text })}
                                placeholder="Số lượng"
                                value={order.soLuong}
                            />
                        </View>
                        <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={styles.textTitle}>Giá đặt</Text>
                            <TextInput
                                name="gia"
                                style={{ ...styles.textInput, width: '100%', marginLeft: 0 }}
                                onChangeText={text => setOrder({ ...order, gia: text })}
                                placeholder="Giá"
                                value={order.gia}
                            />
                        </View>
                    </View>
                    <View style={{ ...styles.content_wp, borderBottomWidth: 1 }}>
                        <View style={styles.box}>
                            <Text style={styles.textTitle}>Giá trị</Text>
                            <Text style={{ ...styles.textTitle, fontWeight: 'bold' }}>1,4444,444,444</Text>
                        </View>
                    </View>
                    <View style={styles.content_wp}>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={handleChooseBuy}>
                                <LinearGradient
                                    colors={['#1BCC77', Color.green]}
                                    style={styles.appButtonContainer}
                                >
                                    <Text style={styles.appButtonText}>Mua</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.box}>
                            <TouchableOpacity onPress={handleChooseSell}>
                                <LinearGradient
                                    colors={['#F8495A', Color.red]}
                                    style={styles.appButtonContainer}
                                >
                                    <Text style={styles.appButtonText}>Bán</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between'
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 40,
        width: '60%',
        marginLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        fontSize: 16
    },
    content_wp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
        marginBottom: 10

    },
    textStyle: {
        paddingVertical: 10,
        height: 40,
        width: '75%',
        marginLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
    },
    box_stk: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    textSelect: {
        marginTop: 5,
        width: '95%',
        paddingLeft: 40,
    },
    box_cp: {
        marginBottom: 5
    },
    textTitle: {
        fontSize: 18,
        marginBottom: 5
    },
    appButtonContainer: {
        elevation: 10,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 12,
        width: 190
    },
    appButtonText: {
        fontSize: 19,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
