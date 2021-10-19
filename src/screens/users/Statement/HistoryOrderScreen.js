import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Api from '../../../api/Statement';
import Styles from '../../../common/StyleTable';
import Formatter from '../../../helpers/formatNumber';
import queryString from 'query-string';
import { useForm, Controller } from "react-hook-form";
import Constants from 'expo-constants';
import { Picker } from '@react-native-picker/picker';
import { yupResolver } from '@hookform/resolvers/yup'; // install @hookform/resolvers (not @hookform/resolvers/yup)
import * as yup from 'yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import Color from '../../../constants/Colors';
import { Col } from 'react-native-table-component';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoryOrderScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCK', 'Mua/Bán', 'KL Khớp/Tổng KL', 'Giá', 'Trạng thái'])
    const [tableData, setTableData] = useState([])
    const [status, setStatus] = useState([])
    const [data, setData] = useState({
        from: moment().subtract(7, 'd'),
        to: moment(),
        MaCK: '',
        MaTT: 'TC',
        current: 1,
        pageSize: 10000
    })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchStatus = async () => {
                const res = await Api.StatusStock()
                setStatus(res.data)
            }
            const fetchApi = async () => {
                const temp = { ...data, from: data.from.format('MM/DD/YYYY'), to: data.to.format('MM/DD/YYYY') }
                const paramsString = queryString.stringify(temp);
                const res = await Api.HistoryOrder(paramsString)
                setTableData(res.data.list)
            }
            fetchApi()
            fetchStatus()
        });
        return unsubscribe;
    }, [navigation]);
    const handleSubmit = async () => {
        const temp = { ...data, from: data.from.format('MM/DD/YYYY'), to: data.to.format('MM/DD/YYYY') }
        const paramsString = queryString.stringify(temp);
        const res = await Api.HistoryOrder(paramsString)
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
                                style={Styles.columnHeader}>
                                <Text style={Styles.columnHeaderTxt}>{column}</Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )

    const showStatusPicker = status?.map((item, index) => {
        return (
            <Picker.Item key={index} label={item.tenTrangThai} value={item.maTt} />
        )
    })
    const ClassNameRender = (val) => {
        if (val === 'CK')
            return Color.yellow
        else if (val === 'KH' || val === 'KP')
            return Color.green
        else
            return Color.red
    }

    return (
        <View style={styles.container}>
            <View style={styles.content_wp}>
                <View style={styles.box}>
                    <Text style={styles.text_title}>MaCK</Text>
                    <TextInput
                        name="maCK"
                        style={styles.textInput}
                        onChangeText={text => setData({ ...data, MaCK: text })}
                        placeholder="MaCK"
                        value={data.MaCK}
                    />
                </View>
                <View style={styles.box}>
                    <Text style={styles.text_title}>MaTT</Text>
                    <View style={styles.textStyle}>
                        <Picker
                            selectedValue={data.MaTT}
                            onValueChange={(itemValue) => setData({ ...data, MaTT: itemValue })} >
                            {showStatusPicker}
                        </Picker>
                    </View>
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
            <View style={styles.content_wp}>
                <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                        colors={[Color.btn_color, Color.bg_color]}
                        style={styles.appButtonContainer}
                    >
                        <Text style={styles.appButtonText}>Xác nhận</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
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
                                <Text
                                    style={{ ...Styles.columnRowTxt, fontWeight: "bold" }}
                                // onPress={() => onClickStock(item)}
                                >
                                    {item.maCP.trim()}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: item.loaiGiaoDich ? Color.green : Color.red }}>{item.loaiGiaoDich ? 'Mua' : 'Bán'}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.soLuong)}/{Formatter(item.slKhop) || '0'}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.gia)}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: ClassNameRender(item.maTT.trim()) }}>{item.tenTrangThai}</Text>
                            </View>
                            <View style={{ ...Styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                                <Text
                                    style={{ ...Styles.columnRowTxt, fontWeight: "bold" }}
                                // onPress={() => onClickStock(item)}
                                >
                                    {item.maCP.trim()}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: item.loaiGiaoDich ? Color.green : Color.red }}>{item.loaiGiaoDich ? 'Mua' : 'Bán'}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.soLuong)}/{Formatter(item.slKhop) || '0'}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.gia)}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: ClassNameRender(item.maTT.trim()) }}>{item.tenTrangThai}</Text>
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
        width: '86%',
        marginLeft: 10,
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
        width: 400
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});