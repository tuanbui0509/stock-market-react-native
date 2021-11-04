import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ApiUser from '../../../api/Account';
import Formatter from '../../../helpers/formatNumber'
import * as Api from '../../../api/Statement';
import Styles from '../../../common/StyleTable';
import Color from '../../../constants/Colors';

export default function HistoryAdvanceMoneyScreen({ navigation }) {
    const [columns, setColumns] = useState(['Ngày Ứng', 'Ngày Bán', 'Số tiền', 'Phí Ứng'])
    const [tableData, setTableData] = useState([])
    const [BankAccount, setBankAccount] = useState([])
    const [data, setData] = useState({
        from: moment().subtract(7, 'd'),
        to: moment(),
        stk: '',
        current: 1,
        pageSize: 10000
    })
    const fetchApi = async () => {
        const res1 = await ApiUser.MyBankAccount()
        setBankAccount(res1.data)
        setData({ ...data, stk: res1.data[0]?.stk })
        const temp = { ...data, from: data.from.format('MM/DD/YYYY'), to: data.to.format('MM/DD/YYYY'), stk: res1.data[0]?.stk }
        const paramsString = queryString.stringify(temp);
        const res = await Api.HistoryAdvanceMoney(paramsString)
        setTableData(res.data.list)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchApi()
        });
        return unsubscribe;
    }, [navigation]);


    const handleSubmit = async () => {
        const temp = { ...data, from: data.from.format('MM/DD/YYYY'), to: data.to.format('MM/DD/YYYY') }
        const paramsString = queryString.stringify(temp);
        const res = await Api.HistoryAdvanceMoney(paramsString)
        setTableData(res.data.list)
    }

    const [showTo, setShowTo] = useState(false);
    const [showFrom, setShowFrom] = useState(false);
    const onFromChange = (e, selectedDate) => {
        const current = selectedDate || data.from
        setShowFrom(false)
        setData({ ...data, from: moment(current) });
    };
    const onToChange = (e, selectedDate) => {
        const current = selectedDate || data.from
        setShowTo(false)
        setData({ ...data, to: moment(current) });
    };

    const tableHeader = () => (
        <View style={Styles.tableHeaderDetail}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...Styles.columnHeader, width: '25%' }} >
                                <Text style={{ ...Styles.columnHeaderTxt, fontSize: 14 }}>{column} </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )

    const showStatusPicker = BankAccount?.map((item, index) => {
        const value = item.nganHang.tenNganHang + ' - ' + item.stk.trim()
        return (
            <Picker.Item key={index} label={value} value={item.stk.trim()} />
        )
    })
    let onChangeListBank = async (stk) => {
        setData({ ...data, stk: stk })
        const temp = { ...data, from: data.from.format('MM/DD/YYYY'), to: data.to.format('MM/DD/YYYY'), stk: stk }
        const paramsString = queryString.stringify(temp);
        const res = await Api.HistoryAdvanceMoney(paramsString)
        setTableData(res.data.list)
    }
    return (
        <View style={styles.container}>
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
                <View style={styles.box}>
                    {showFrom && (
                        <DateTimePicker
                            value={new Date(data.from)}
                            mode='date'
                            name='from'
                            maximumDate={new Date(data.to)}
                            onChange={onFromChange}
                        />
                    )}
                    <Text style={styles.text_title}>Từ ngày</Text>
                    <Text style={styles.textInput} onPress={() => setShowFrom(true)}>{data.from.format('DD/MM/YYYY')}</Text>

                </View>
                <View style={styles.box}>
                    {showTo && (
                        <DateTimePicker
                            value={new Date(data.to)}
                            mode='date'
                            name='to'
                            minimumDate={new Date(data.from)}
                            maximumDate={new Date(moment())}
                            onChange={onToChange}
                        />
                    )}
                    <Text style={styles.text_title}>Đến ngày</Text>
                    <Text style={styles.textInput} onPress={() => setShowTo(true)}>{data.to.format('DD/MM/YYYY')}</Text>

                </View>
            </View>
            <TouchableOpacity onPress={handleSubmit}>
                <LinearGradient
                    colors={[Color.btn_color, Color.bg_color]}
                    style={styles.appButtonContainer}
                >
                    <Text style={styles.appButtonText}>Cập nhật</Text>
                </LinearGradient>
            </TouchableOpacity>
            <FlatList
                data={tableData}
                style={{ width: "100%", marginTop: 10, }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <ScrollView >
                            <View style={{ ...Styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '30%' }}>{format(new Date(item.ngayYeuCau), 'dd/MM/yyyy kk:mm:ss')}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '30%' }}>{format(new Date(item.ngayBan), 'dd/MM/yyyy kk:mm:ss')}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.soTien)}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.phiUng)}</Text>
                            </View>
                        </ScrollView>
                    )
                }}
            />

        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        margin: 5,
        paddingTop: 10
    },
    content: {
        marginVertical: 20,
    },
    content_wp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10
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
        fontSize: 16,
        fontWeight: 'bold'
    },
    textStyle: {
        paddingVertical: 10,
        height: 40,
        width: '90%',
        marginLeft: 20,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,
    },
    textInput: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        height: 35,
        width: '60%',
        marginLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,

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
    }
});