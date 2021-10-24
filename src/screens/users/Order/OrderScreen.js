import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Button } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as ApiLT from '../../../api/LightningTable';
import * as ApiUser from '../../../api/Account';
import Color from '../../../constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { RadioButton } from 'react-native-paper';
import * as Price from '../../../constants/Price';
import Formatter from '../../../helpers/formatNumber'
import { fetchLightningTable } from '../../../store/common/LightningTable';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyStock } from '../../../store/users/MyStock';
import Modal from "react-native-modal";
import styleModal from '../../../common/styleModal';
const OrderScreen = ({ navigation }) => {
    const LightningTable = useSelector(state => state.LightningTable)
    const MyStock = useSelector(state => state.MyStock)
    const dispatch = useDispatch()

    const [stocks, setStocks] = useState([]);
    const [BankAccount, setBankAccount] = useState([])
    const [currentBank, setCurrentBank] = useState()
    const [currentStock, setCurrentStock] = useState()
    const [order, setOrder] = useState({
        stk: "",
        maCp: "",
        gia: 0,
        soLuong: 0,
        mkdatLenh: '',
        loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
        loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
    });
    const fetchBankAccount = async () => {
        const res = await ApiUser.MyBankAccount()
        setBankAccount(res.data)
        setCurrentBank(res.data[0])

    }
    const fetchApiStocks = async () => {
        const res = await ApiLT.LightningTable()
        setStocks(res.data);
        dispatch(fetchLightningTable(res.data))
    }
    const fetchApiMyStock = async () => {
        const res = await ApiUser.MyStocks()
        dispatch(fetchMyStock(res.data.list))
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setOrder({
                ...order,
                maCp: "",
                gia: 0,
                soLuong: 0,
                mkdatLenh: "",
                loaiGiaoDich: true,// Trạng thái mua bán mua: true, bán: false
                loaiLenh: 'LO'// Trạng thái Loai: ATO, ATC, LO
            })
            setCurrentStock()
            fetchBankAccount()
            fetchApiStocks()
            fetchApiMyStock()

        });

        return unsubscribe;
    }, [navigation]);
    const showStatusPicker = BankAccount?.map((item, index) => {
        const value = item.nganHang.tenNganHang + ' - ' + item.stk.trim()
        return (
            <Picker.Item key={index} label={value} value={item.stk.trim()} />
        )
    })
    const mapMyStockToLightningTable = () => {
        // const temp = [...LightningTable]
        const result = LightningTable.filter(o1 => MyStock?.some(o2 => o1.macp.trim() === o2.maCp.trim()));
        setStocks(result)
    }
    const handleSelectItem = (item) => {
        setOrder({ ...order, maCp: item.macp })
        setCurrentStock(item)
    }
    const handleChooseBuy = () => {
        setOrder({ ...order, loaiGiaoDich: true })
        fetchApiStocks()
    }
    const handleChooseSell = async () => {
        try {
            setOrder({ ...order, loaiGiaoDich: false })
            setCurrentStock({})
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
    const stockInformation = () => {
        return (<View style={{ ...styles.content_wp, borderBottomWidth: 1 }}>
            <View style={styles.box_cp}>
                <Text style={{ fontSize: 24 }}>Giá: {currentStock?.gia / Price.PRICE || null}</Text>
                <Text style={styles.textTitle}>KL: {currentStock?.kl || null}</Text>
            </View>
            <View style={styles.box_cp}>
                <Text style={{ ...styles.textTitle, color: Color.ceil }}>Trần: {(currentStock?.giaTran / Price.PRICE) || null}</Text>
                <Text style={{ ...styles.textTitle, color: Color.floor }}>Sàn: {(currentStock?.giaSan / Price.PRICE) || null}</Text>
                <Text style={{ ...styles.textTitle, color: Color.standard }}>TC: {(currentStock?.giaTC / Price.PRICE) || null}</Text>
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
                        <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 16, color: '#000' }}>{Formatter(order.gia * order.soLuong)}</Text>
                    </View>
                    <View style={styles.contentLabel}>
                    </View>
                </View>
                <View style={styles.wrapperLabel}>
                    <TouchableOpacity onPress={handleConfirm}>
                        <LinearGradient
                            colors={['#F8495A', Color.red]}
                            style={{ ...styles.appButtonContainer, width: 140, marginRight: 20 }}
                        >
                            <Text style={styles.appButtonText}>Xác nhận</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSubmit}>
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


    const ComponentConFirm = () =>
        <View style={styleModal.centeredView}>
            <View style={styleModal.modalView}>
                <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 18, color: '#000' }}>Nhập mã Pin của bạn?</Text>
                <TextInput
                    name="mkdatLenh"
                    style={{ ...styles.textInput, width: '80%', marginLeft: 0, marginBottom: 20 }}
                    onChangeText={text => setOrder({ ...order, mkdatLenh: text })}
                    placeholder="Mã Pin của bạn"
                    secureTextEntry={true}
                    maxLength={6}
                    value={order.mkdatLenh}
                />
                <View style={styles.wrapperLabel}>
                    <TouchableOpacity onPress={handleFinish}>
                        <LinearGradient
                            colors={['#F8495A', Color.red]}
                            style={{ ...styles.appButtonContainer, width: 140, marginRight: 20 }}
                        >
                            <Text style={styles.appButtonText}>Xác nhận</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { setModalConfirmVisible(false), setOrder({ ...order, mkdatLenh: null }) }}>
                        <LinearGradient
                            colors={['#fff', '#fff']}
                            style={{ ...styles.appButtonContainer, width: 140 }}
                        >
                            <Text style={{ ...styles.appButtonText, color: '#333' }}>Hủy bỏ</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </View>;
    const [isModalFormVisible, setModalFormVisible] = useState(false);
    const [isModalConfirmVisible, setModalConfirmVisible] = useState(false);

    const handleSubmit = () => {
        setModalFormVisible(!isModalFormVisible);
        // setModalConfirmVisible(!isModalConfirmVisible);
    };

    const handleConfirm = () => {
        setModalFormVisible(!isModalFormVisible);
        setModalConfirmVisible(!isModalConfirmVisible);
    };

    const handleFinish = () => {
        setModalConfirmVisible(!isModalConfirmVisible);
        setOrder({ ...order, mkdatLenh: '' })
        console.log('====================================');
        console.log(order);
        console.log('====================================');
    };
    return (
        <>
            <CustomHeader title="Đặt lệnh" isHome={true} navigation={navigation} />
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
                            onTextChange={text => console.log(text)}
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
                                borderBottomWidth: 0
                            }}
                            itemTextStyle={{
                                color: '#222',
                            }}
                            itemsContainerStyle={{
                                maxHeight: '70%',
                            }}
                            resetValue={false}
                            items={stocks}
                            placeholder="Tìm mã cổ phiếu"
                            // resetValue={false}
                            underlineColorAndroid="transparent"
                            setSort={(item, searchedText) => item.macp.trim().toLowerCase().startsWith(searchedText.toLowerCase())}
                        />
                    </View>
                </View>
                <ScrollView>
                    {currentStock ? stockInformation() : null}
                    <View style={styles.content_wp}>
                        <View style={styles.box}>
                            <Text style={styles.textTitle}>Số dư tài khoản</Text>
                            <Text style={{ ...styles.textTitle, fontWeight: 'bold', color: '#000' }}>{currentBank ? Formatter(currentBank?.soDu) : '0'}</Text>
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
                                keyboardType='numeric'
                                maxLength={7}
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
                                keyboardType='numeric'
                                maxLength={7}
                                value={order.gia}
                            />
                        </View>
                    </View>
                    {/* <View style={{ ...styles.content_wp, borderBottomWidth: 1 }}>
                        <View style={styles.box}>
                            <Text style={styles.textTitle}>Giá trị</Text>
                            <Text style={{ ...styles.textTitle, fontWeight: 'bold' }}>1,4444,444,444</Text>
                        </View>
                    </View> */}

                    <View style={styles.content_wp}>
                        <View style={{ ...styles.box, justifyContent: "center" }}>
                            <Text style={styles.textLabel}>LO</Text>
                            <RadioButton
                                value="LO"
                                label="Carto Base MAp"
                                status={order.loaiLenh === 'LO' ? 'checked' : 'unchecked'}
                                onPress={() => { setOrder({ ...order, loaiLenh: 'LO' }); }}
                            />
                        </View>
                        <View style={{ ...styles.box, justifyContent: "center" }}>
                            <Text style={styles.textLabel}>ATC</Text>
                            <RadioButton
                                value="ATC"
                                status={order.loaiLenh === 'ATC' ? 'checked' : 'unchecked'}
                                onPress={() => { setOrder({ ...order, loaiLenh: 'ATC' }); }}
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

                    <View style={{ ...styles.content_wp, justifyContent: 'center', flexDirection: "column" }}>
                        {/* <View style={styles.box}> */}
                        <TouchableOpacity onPress={handleSubmit}>
                            <LinearGradient
                                colors={[Color.btn_color, Color.bg_color]}
                                style={{ ...styles.appButtonContainer, width: 220 }}
                            >
                                <Text style={styles.appButtonText}>Xác nhận</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        {/* </View> */}
                    </View>
                    <Text style={{ fontSize: 10, textAlign: 'center' }}>Giá x 1000 VNĐ. Bản quyền thuộc về Công ty Cổ phần chứng khoán NTNT. © 2021</Text>
                </ScrollView>
            </SafeAreaView>

            <Modal
                isVisible={isModalFormVisible}
                onBackdropPress={() => setModalFormVisible(false)}
                testID={'modal'}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <ComponentForm />
            </Modal>

            <Modal
                isVisible={isModalConfirmVisible}
                onBackdropPress={() => setModalConfirmVisible(false)}
                testID={'modal'}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <ComponentConFirm />
            </Modal>
        </>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
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
    textStyle: {
        paddingVertical: 10,
        height: 40,
        width: '80%',
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
        // width: '100%',
        paddingLeft: 30,
        // height: 150
        maxHeight: 150
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
    }
});
