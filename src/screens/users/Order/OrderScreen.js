import { Picker } from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { LogBox, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { useDispatch, useSelector } from 'react-redux';
import * as ApiUser from '../../../api/Account';
import * as ApiLT from '../../../api/LightningTable';
import * as ApiOrder from '../../../api/Order';
import styleModal from '../../../common/styleModal';
import CustomHeader from '../../../components/CustomHeader';
import Color from '../../../constants/Colors';
import * as Price from '../../../constants/Price';
import Formatter from '../../../helpers/formatNumber';
import * as notification from '../../../helpers/Notification';
import { useOrientation } from '../../../helpers/useOrientation';
import { fetchLightningTable } from '../../../store/common/LightningTable';
import { fetchMyStock } from '../../../store/users/MyStock';
import Loading from '../../../helpers/Loading';

function OrderScreen({ navigation, route }) {
    const LightningTable = useSelector(state => state.LightningTable)
    const MyStock = useSelector(state => state.MyStock)
    const dispatch = useDispatch()
    const orientation = useOrientation()

    const [stocks, setStocks] = useState(null);
    const [BankAccount, setBankAccount] = useState([])
    const [currentBank, setCurrentBank] = useState()
    const [currentStock, setCurrentStock] = useState([])
    const [tempStock, setTempStock] = useState({})
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false)
    const inputRef = useRef('');
    const [order, setOrder] = useState({
        stk: "",
        maCp: "",
        gia: '',
        soLuong: '',
        mkdatLenh: '',
        loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
        loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
    });
    const [errorOrder, SetErrorOrder] = useState({
        ErrorMaCp: false,
        ErrorGia: false,
        ErrorSoLuong: false,
        ErrorMkdatLenh: false,
    });
    const fetchBankAccount = async () => {
        const res = await ApiUser.MyBankAccountExits()
        setBankAccount(res.data)
        setCurrentBank(res.data[0])
        setOrder({ ...order, stk: res.data[0].stk })
    }
    const fetchApiStocks = async () => {
        const res = await ApiLT.LightningTable()
        dispatch(fetchLightningTable(res.data))
        const suggestions = res.data.map((item) => ({
            id: item.macp.trim(),
            name: item.macp.trim()
        }))
        setStocks(suggestions)
    }
    const fetchApiMyStock = async () => {
        const res = await ApiUser.MyStocksExits()
        dispatch(fetchMyStock(res.data))
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setOrder({
                stk: BankAccount[0]?.stk,
                maCp: '',
                gia: '',
                soLuong: '',
                mkdatLenh: '',
                loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
                loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
            })
            setCurrentStock([])
            fetchBankAccount()
            fetchApiStocks()
            fetchApiMyStock()
            setTempStock({})
            SetErrorOrder({
                ErrorMaCp: false,
                ErrorGia: false,
                ErrorMkdatLenh: false,
                ErrorSoLuong: false,
            })
            LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        });

        return unsubscribe;
    }, [navigation]);
    const showStatusPicker = BankAccount?.map((item, index) => {
        const value = item.nganHang.tenNganHang + ' - ' + item.stk.trim()
        return (
            <Picker.Item key={index} label={value} value={item.stk.trim()} />
        )
    })

    const handleChooseBuy = () => {
        setCurrentStock({})
        setOrder({ ...order, loaiGiaoDich: true })
        fetchApiStocks()
    }
    const handleChooseSell = () => {
        try {
            setCurrentStock({})
            setOrder({ ...order, loaiGiaoDich: false })
            mapMyStockToLightningTable()
        } catch (error) {
            console.log(error);
        }
    }
    let findIndex = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].stk.trim() === id?.trim())
                return i;
        return -1;
    }
    let onChangeListBank = (stk) => {
        setOrder({ ...order, stk: stk })
        let index = findIndex(stk, BankAccount)
        if (index === -1)
            return;
        let res = BankAccount[index];
        setCurrentBank(res)
    }

    const findById = (id, list) => {
        for (let i = 0; i < list.length; i++)
            if (list[i].macp.trim() === id?.trim())
                return list[i];
    }

    const stockInformation = () => {
        return (<View style={{ ...styles.content_wp, borderBottomWidth: 1 }}>
            <View style={styles.box_cp}>
                <Text style={{ fontSize: 24 }}>Giá: {tempStock?.gia / Price.PRICE || null}</Text>
                {/* <Text style={styles.textTitle}>KL: {tempStock?.kl || null}</Text> */}
            </View>
            <View style={styles.box_cp}>
                <Text style={{ ...styles.textTitle, color: Color.ceil }}>Trần: {(tempStock?.giaTran / Price.PRICE) || null}</Text>
                <Text style={{ ...styles.textTitle, color: Color.floor }}>Sàn: {(tempStock?.giaSan / Price.PRICE) || null}</Text>
                <Text style={{ ...styles.textTitle, color: Color.standard }}>TC: {(tempStock?.giaTC / Price.PRICE) || null}</Text>
            </View>
        </View>)
    }

    const ComponentForm = () =>
        <View style={styleModal.centeredView}>
            <View style={styleModal.modalView}>
                <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 18, color: '#000' }}>Bạn có muốn đặt lệnh này không?</Text>
                <View style={styles.wrapperLabel}>
                    <View style={styles.contentLabel}>
                        <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Tài khoản:</Text>
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.stk}</Text>
                    </View>
                    <View style={styles.contentLabel}>
                    </View>
                </View>
                <View style={styles.wrapperLabel}>
                    <View style={styles.contentLabel}>
                        <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Mua/Bán:</Text>
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: order.loaiGiaoDich ? Color.green : Color.red }}>{order.loaiGiaoDich ? 'Mua' : 'Bán'}</Text>
                    </View>
                    <View style={styles.contentLabel}>
                        <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Mã CK:</Text>
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.maCp}</Text>
                    </View>
                </View>
                <View style={styles.wrapperLabel}>
                    <View style={styles.contentLabel}>
                        <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Số lượng:</Text>
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.soLuong}</Text>
                    </View>
                    <View style={styles.contentLabel}>
                        <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Giá:</Text>
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{order.gia}</Text>
                    </View>
                </View>
                <View style={styles.wrapperLabel}>
                    <View style={styles.contentLabel}>
                        <Text style={{ ...styles.textTitle, fontSize: 16, marginRight: 20 }}>Giá trị:</Text>
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{Formatter((order.gia * 1000) * order.soLuong)}</Text>
                    </View>
                    <View style={styles.contentLabel}>
                    </View>
                </View>
                <View style={styles.wrapperLabel}>
                    <TouchableOpacity onPress={handleFinish}>
                        <LinearGradient
                            colors={['#F8495A', Color.red]}
                            style={{ ...styles.appButtonContainer, width: 140, marginRight: 20 }}
                        >
                            <Text style={styles.appButtonText}>Xác nhận</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVisible(!visible)}>
                        <LinearGradient
                            colors={['#fff', '#fff']}
                            style={{ ...styles.appButtonContainer, width: 140 }}
                        >
                            <Text style={{ ...styles.appButtonText, color: '#333' }}>Đóng</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;

    const [visible, setVisible] = useState(false)
    const toggleOverlay = () => {
        setVisible(!visible);
    };
    const handleSubmitForm = async () => {
        if ((order.maCp === '' || order.maCp === undefined) && order.soLuong === '' && order.gia === '' && order.mkdatLenh === '') {
            SetErrorOrder({ ErrorMaCp: true, ErrorSoLuong: true, ErrorGia: true, ErrorMkdatLenh: true })
            return
        }
        if (order.maCp === '' || order.maCp === undefined) {
            SetErrorOrder({ ...errorOrder, ErrorMaCp: true })
            return
        }
        if (order.soLuong === '') {
            SetErrorOrder({ ...errorOrder, ErrorSoLuong: true })
            return
        }
        if (order.gia === '') {
            SetErrorOrder({ ...errorOrder, ErrorGia: true })
            return
        }
        if (order.mkdatLenh === '') {
            SetErrorOrder({ ...errorOrder, ErrorMkdatLenh: true })
            return
        }
        const res = await ApiOrder.CheckOrder(order)
        if (res.data.status === 0) {
            setVisible(!visible);
        }
        else {
            notification.DangerNotification(res.data.message)
        }

    };

    const handleFinish = async () => {
        const res = await ApiOrder.Order(order)
        if (res.data.status === 0) {
            setVisible(!visible);
            setLoading(true)
            setTimeout(() => {
                notification.SuccessNotification(res.data.message)
                setLoading(false)
                navigation.replace('HomeApp')
            }, 3000);
        }
        else {
            notification.DangerNotification(res.data.message)
            setVisible(!visible);
        }
    };

    const handleChangeSoLuong = (value) => {
        if (value.trim().length >= 1) {
            SetErrorOrder({ ...errorOrder, ErrorSoLuong: false })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorSoLuong: true })
        }
        setOrder({ ...order, soLuong: value })
    }

    const handleBlurSoluong = () => {
        const { soLuong } = order
        if (soLuong.trim().length >= 1) {
            SetErrorOrder({ ...errorOrder, ErrorSoLuong: false })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorSoLuong: true })
        }
    }

    const handleChangeGia = (value) => {
        if (value.trim().length >= 1) {
            SetErrorOrder({ ...errorOrder, ErrorGia: false })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorGia: true })
        }
        setOrder({ ...order, gia: value })
    }

    const handleBlurGia = () => {
        const { gia } = order
        if (gia.trim().length >= 1) {
            SetErrorOrder({ ...errorOrder, ErrorGia: false })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorGia: true })
        }
    }

    const handleChangeMkdatLenh = (value) => {
        if (value.trim().length >= 1) {
            SetErrorOrder({ ...errorOrder, ErrorMkdatLenh: false })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorMkdatLenh: true })
        }
        setOrder({ ...order, mkdatLenh: value })
    }

    const handleBlurMkdatLenh = () => {
        const { mkdatLenh } = order
        if (mkdatLenh.trim().length >= 1) {
            SetErrorOrder({ ...errorOrder, ErrorMkdatLenh: false })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorMkdatLenh: true })
        }
    }

    const mapMyStockToLightningTable = () => {
        const result = LightningTable.filter(o1 => MyStock?.some(o2 => o1.macp.trim() === o2.maCp.trim()));
        const suggestions = result.map((item) => ({
            id: item.macp,
            name: item.macp.trim()
        }))
        setStocks(suggestions)
    }
    const handleSelectItem = (item) => {
        if (item === null) {
            SetErrorOrder({ ...errorOrder, ErrorMaCp: true })
        } else {
            SetErrorOrder({ ...errorOrder, ErrorMaCp: false })
            setOrder({ ...order, maCp: item?.id })
            setCurrentStock(item)
            const res = findById(item?.id, LightningTable);
            setTempStock(res)
        }

    }
    return (
        <>
            <CustomHeader title="Đặt lệnh" isHome={true} navigation={navigation} />
            {isFocused ?
                <>
                    <SafeAreaView style={styles.container}>
                        <View>
                            <View style={styles.box_stk}>
                                <View style={styles.textStyle}>
                                    <Picker
                                        selectedValue={order.stk}
                                        onValueChange={onChangeListBank}>
                                        {showStatusPicker}
                                    </Picker>
                                </View>
                            </View>

                            <View style={styles.textSelect}>
                                <SearchableDropdown
                                    selectedItems={currentStock}
                                    onItemSelect={handleSelectItem}
                                    containerStyle={{ padding: 5 }}
                                    resetValue={false}
                                    textInputStyle={{
                                        paddingVertical: 9,
                                        paddingHorizontal: 12,
                                        width: '100%',
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
                                        width: '100%',
                                        borderWidth: StyleSheet.hairlineWidth,
                                        borderColor: '#e5e5e5',
                                        marginLeft: 10,
                                    }}
                                    itemTextStyle={{
                                        color: '#222',
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                    }}
                                    containerStyle={{
                                        borderColor: '#e5e5e5',
                                    }}
                                    itemsContainerStyle={{ maxHeight: 130 }}
                                    multi={false}
                                    items={stocks}

                                    textInputProps={
                                        {
                                            placeholder: 'Tìm mã cổ phiếu',
                                            underlineColorAndroid: "transparent",
                                        }
                                    }
                                    underlineColorAndroid="transparent"
                                    setSort={(item, searchedText) => item.name.toLowerCase().startsWith(searchedText.toLowerCase())}

                                />
                                {errorOrder.ErrorMaCp ? <Text style={styles.errorMsg}>Không được để trống!</Text> : null}

                            </View>

                            {stockInformation()}
                            <View style={styles.content_wp}>
                                <View style={styles.box}>
                                    <Text style={styles.textTitle}>Số dư tài khoản</Text>
                                    <Text style={{ ...styles.textTitle, fontWeight: 'bold', color: '#000' }}>{currentBank ? Formatter(currentBank?.soDu) : '0'}</Text>
                                </View>
                            </View>
                        </View>
                        <ScrollView>

                            <View style={styles.content_wp}>

                                <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Text style={styles.textTitle}>Giá đặt</Text>
                                    <TextInput
                                        // ref={inputRef}
                                        name="gia"
                                        placeholder="Giá"
                                        keyboardType='numeric'
                                        style={styles.textInput}
                                        value={order.gia}
                                        onChangeText={handleChangeGia}
                                        onBlur={e => handleBlurGia()}
                                    />
                                    {errorOrder.ErrorGia ? <Text style={styles.errorMsg}>Không được để trống!</Text> : null}
                                </View>
                                <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Text style={styles.textTitle}>Khối lượng</Text>
                                    <TextInput
                                        // ref={inputRef}
                                        name="soLuong"
                                        placeholder="Khối lượng"
                                        keyboardType='numeric'
                                        style={styles.textInput}
                                        value={order.soLuong}
                                        onChangeText={handleChangeSoLuong}
                                        onBlur={e => handleBlurSoluong()}
                                    />
                                    {errorOrder.ErrorSoLuong ? <Text style={styles.errorMsg}>Không được để trống!</Text> : null}
                                </View>
                            </View>

                            <View style={styles.content_wp}>
                                <View style={{ ...styles.box, justifyContent: "center" }}>
                                    <Text style={{ ...styles.textLabel, color: '#000' }}>LO</Text>
                                    <RadioButton
                                        value="LO"
                                        label="Carto Base MAp"
                                        status={order.loaiLenh === 'LO' ? 'checked' : 'unchecked'}
                                        onPress={() => { setOrder({ ...order, loaiLenh: 'LO' }); }}
                                    />
                                </View>

                                <View style={{ ...styles.box, justifyContent: "center" }}>
                                    <Text style={styles.textLabel}>ATO</Text>
                                    <RadioButton
                                        value="ATO"
                                        status={order.loaiLenh === 'ATO' ? 'checked' : 'unchecked'}
                                        onPress={() => { setOrder({ ...order, loaiLenh: 'ATO' }); }}
                                    />
                                </View>

                                <View style={{ ...styles.box, justifyContent: "center" }}>
                                    <Text style={styles.textLabel}>ATC</Text>
                                    <RadioButton
                                        disabled={true}
                                        value="ATC"
                                        status={order.loaiLenh === 'ATC' ? 'checked' : 'unchecked'}
                                        onPress={() => { setOrder({ ...order, loaiLenh: 'ATC' }); }}
                                    />
                                </View>
                            </View>
                            <View style={styles.content_wp}>
                                <View style={styles.box}>
                                    <TouchableOpacity onPress={handleChooseBuy}>
                                        {order.loaiGiaoDich ? <LinearGradient
                                            colors={['#1BCC77', Color.green]}
                                            style={styles.appButtonContainer}
                                        >
                                            <Text style={styles.appButtonText}>Mua</Text>
                                        </LinearGradient> :
                                            <LinearGradient
                                                colors={['#fff', '#fff']}
                                                style={styles.appButtonContainer}
                                            >
                                                <Text style={{ ...styles.appButtonText, color: '#333' }}>Mua</Text>
                                            </LinearGradient>}
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.box}>
                                    <TouchableOpacity onPress={handleChooseSell}>
                                        {!order.loaiGiaoDich ? <LinearGradient
                                            colors={['#F8495A', Color.red]}
                                            style={styles.appButtonContainer}
                                        >
                                            <Text style={styles.appButtonText}>Bán</Text>
                                        </LinearGradient> :
                                            <LinearGradient
                                                colors={['#fff', '#fff']}
                                                style={styles.appButtonContainer}
                                            >
                                                <Text style={{ ...styles.appButtonText, color: '#333' }}>Bán</Text>
                                            </LinearGradient>
                                        }
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.content_wp}>
                                <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <Text style={styles.textTitle}>Mật khẩu đặt lệnh</Text>
                                    <TextInput
                                        // ref={inputRef}
                                        name="mkdatLenh"
                                        placeholder="******"
                                        style={styles.textInput}
                                        keyboardType='numeric'
                                        value={order.mkdatLenh}
                                        onChangeText={handleChangeMkdatLenh}
                                        onBlur={e => handleBlurMkdatLenh()}
                                        maxLength={6}
                                        secureTextEntry
                                    />
                                    {errorOrder.ErrorMkdatLenh ? <Text style={styles.errorMsg}>Không được để trống!</Text> : null}
                                </View>
                                <View style={{ ...styles.box, flexDirection: 'column', alignItems: 'flex-start' }}>
                                </View>
                            </View>

                            <View style={{ ...styles.content_wp, justifyContent: 'center', flexDirection: "column" }}>
                                {/* <View style={styles.box}> */}
                                <TouchableOpacity onPress={handleSubmitForm}>
                                    <LinearGradient
                                        colors={[Color.btn_color, Color.bg_color]}
                                        style={{ ...styles.appButtonContainer, width: 220 }}
                                    >
                                        <Text style={styles.appButtonText}>Xác nhận</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                {/* </View> */}
                            </View>
                            <Text style={{ fontSize: 13, textAlign: 'center' }}>Giá x 1000 VNĐ. Bản quyền thuộc về Công ty Cổ phần chứng khoán NTNT. © 2021</Text>
                        </ScrollView>
                    </SafeAreaView>
                </>
                : null}


            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ backgroundColor: 'transparent' }}
            >
                <ComponentForm />
            </Overlay>
            <Loading loading={loading} />
        </>
    );
}

export default OrderScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10
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
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        fontSize: 16
    },
    content_wp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
        marginBottom: 10

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        textAlign: 'center'
    },
    textStyle: {
        paddingVertical: 10,
        height: 40,
        width: '90%',
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
    },
    box_cp: {
        marginBottom: 5
    },
    textTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#888'
    },
    textLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    appButtonContainer: {
        // elevation: 10,
        borderRadius: 8,
        paddingVertical: 8,
        // height: 40,
        paddingHorizontal: 12,
        width: 150,
        borderWidth: 1,
        borderColor: '#d5d5d5',
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    wrapperLabel: {
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
    },
    // responsive
    textStyle_responsive: {
        paddingVertical: 10,
        height: 40,
        marginTop: 5,
        width: '50%',
        flex: 1,
        borderWidth: StyleSheet.hairlineWidth,
        fontSize: 16,
        borderRadius: 10,
    },
    textInput_responsive: {
        paddingVertical: 10,
        height: 40,
        paddingHorizontal: 8,
        flex: 1,
        marginTop: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        fontSize: 16
    },
    box_responsive: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
        fontSize: 14
    },
    box_column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1

    }
});