import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import Modal from "react-native-modal"
import { useDispatch, useSelector } from 'react-redux'
import * as ApiUser from '../../../api/Account'
import styleModal from '../../../common/styleModal'
import CustomHeader from '../../../components/CustomHeader'
import Color from '../../../constants/Colors'
import Formatter from '../../../helpers/formatNumber'
import { fetchBankAccount } from '../../../store/users/BankAccount'
import DateTimePicker from '@react-native-community/datetimepicker';

function AdvanceMoneyScreen({ navigation }) {
    const ListBankAccount = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()
    const [showDate, setShowDate] = useState(false)
    const [khaDung, setKhaDung] = useState(0)
    const [PhiUng, setPhiUng] = useState(0)

    const [data, setData] = useState({
        ngayBan: moment(),
        stk: '',
        soTien: '',
    })
    const fetchBank = async () => {
        const res = await ApiUser.MyBankAccount()
        dispatch(fetchBankAccount(res.data))
        setData({ ...data, stk: res.data[0]?.stk })
        let temp = data.ngayBan.format('MM-DD-YYYY')
        const res1 = await ApiUser.KhaDung({ currentBank: res.data[0]?.stk, date: temp })
        console.log(res1.data)
        setKhaDung(Formatter(res1.data.data))
    }
    const fetchKhaDung = async (date, stk) => {
        try {
            let temp = date.format('MM-DD-YYYY')
            const res = await ApiUser.KhaDung({ currentBank: stk, date: temp })
            console.log(res.data)
            setKhaDung(Formatter(res.data.data))
        } catch (error) {
            Alert.alert('Thất bại!', error.data.message)
            setData({ ...data, ngayBan: moment() })
            fetchKhaDung(moment(), stk)
        }
    }
    const fetchPhiUng = async () => {
        const res = await ApiUser.PhiUng(data.soTien)
        setPhiUng(res.data.data)
    }

    const fetchLenhUng = async () => {
        try {

            const res = await ApiUser.LenhUng(data)
            Alert.alert('Thành công', 'Bạn đã ứng tiền thành công')
            setModalVisible(!isModalVisible)
            fetchKhaDung(data.ngayBan, data.stk)
            setData({ ...data, soTien: '' })
        } catch (error) {
            Alert.alert('Thất bại', error.data.message)

        }
    }
    useEffect(() => {
        fetchBank()
    }, []);

    const [isModalVisible, setModalVisible] = useState(false)

    const handleSubmit = () => {
        fetchPhiUng()
        setModalVisible(!isModalVisible)
    }

    const handleSubmitLend = () => {
        fetchLenhUng()
    }


    const YourOwnComponent = () =>
        <View style={styleModal.centeredView}>
            <View style={styleModal.modalView}>
                <Text style={{ ...styles.textTitleRBSheet, fontSize: 18, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' }}>{`Số tiền bạn muốn ứng là: ${data.soTien}`}</Text>
                <Text style={{ ...styles.textTitleRBSheet, fontSize: 16, marginBottom: 20 }}>{`Phí ứng: ${PhiUng}`}</Text>
                <View style={styles.wrapperLabel}>
                    <TouchableOpacity onPress={handleSubmitLend}>
                        <LinearGradient
                            colors={['#F8495A', Color.red]}
                            style={{ ...styles.appButtonContainer, width: 120, marginRight: 20 }}
                        >
                            <Text style={styles.appButtonText}>Xác nhận</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
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

    const showStatusPicker = ListBankAccount?.map((item, index) => {
        const value = item.nganHang.tenNganHang + ' - ' + item.stk.trim()
        return (
            <Picker.Item key={index} label={value} value={item.stk.trim()} />
        )
    })
    let onChangeListBank = (stk) => {
        setData({ ...data, stk: stk })
        fetchKhaDung(data.ngayBan, stk)

    }
    const onDateChange = (e, selectedDate) => {
        const current = selectedDate || data.ngayBan
        setShowDate(false)
        setData({ ...data, ngayBan: moment(current) })
        fetchKhaDung(moment(current), data.stk)
    }
    return (
        <View style={styles.container}>
            <CustomHeader title="" navigation={navigation} />
            <View style={styles.content}>
                <View style={styles.content_wp}>
                    <View style={styles.textStyle}>
                        <Picker
                            selectedValue={data.stk}
                            onValueChange={onChangeListBank}>
                            {showStatusPicker}
                        </Picker>
                    </View>
                </View>
                <View style={styles.content_wp}>
                    <Text style={{ ...styles.text_title, textAlign: 'center' }}>Khả dụng: </Text>
                    <Text style={{ ...styles.text_title, textAlign: 'center' }}>{khaDung}</Text>
                </View>
                <View style={styles.content_wp}>
                    {showDate && (
                        <DateTimePicker
                            value={new Date(data.ngayBan)}
                            mode='date'
                            name='ngayBan'
                            maximumDate={new Date()}
                            onChange={onDateChange}
                        />
                    )}
                    <Text style={styles.text_title}>Ngày bán</Text>
                    <Text style={styles.textInput} onPress={() => setShowDate(true)}>{data.ngayBan.format('DD/MM/YYYY')}</Text>


                </View>
                <View style={styles.content_wp}>
                    <Text style={styles.text_title}>Số tiền</Text>
                    <TextInput
                        name="soTien"
                        style={styles.textInput}
                        onChangeText={text => setData({ ...data, soTien: text })}
                        placeholder="Số tiền"
                        value={data.soTien}
                    />
                </View>
                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                        colors={[Color.btn_color, Color.bg_color]}
                        style={styles.appButtonContainer}
                    >
                        <Text style={styles.appButtonText}>Ứng tiền</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                testID={'modal'}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <YourOwnComponent />
            </Modal>

        </View>
    )
}

export default AdvanceMoneyScreen
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        // marginVertical: 20,
        marginHorizontal: 10
    },
    content_wp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20

    },
    picker: {
        backgroundColor: '#f2f2f2',
        marginLeft: 10,
        borderRadius: 6,
        width: 155,
    },
    error: {
        color: '#ff0000',
        fontSize: 9,
        marginBottom: 8,
        marginLeft: 6,
    },
    text_title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    textStyle: {
        paddingVertical: 10,
        height: 40,
        width: '90%',
        marginLeft: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        fontSize: 18
    },
    textInput: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        height: 35,
        width: '70%',
        marginLeft: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
        fontSize: 16

    },
    appButtonContainer: {
        elevation: 8,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 12,
        width: '100%'
    },
    appButtonText: {
        fontSize: 16,
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
})