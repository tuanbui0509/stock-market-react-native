import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import * as Api from '../../../api/Account';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBankAccount } from '../../../store/users/BankAccount';
import Formatter from '../../../helpers/formatNumber'

export default function MyBankAccountScreen() {
    const BankAccount = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()
    const [columns, setColumns] = useState(['Số dư tài khoản', 'Số dư T0', 'Số dư T1', 'Số dư T2', 'Chờ thanh toán', 'Tổng số tiền'])
    const [widthArr, setWidthArr] = useState([130, 100, 100, 100, 120, 120])
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await Api.MyBankAccount()
            res.data.forEach((e) => {
                e.soDuT0 = Formatter(e.soDuT0) || 0;
                e.soDuT1 = Formatter(e.soDuT1) || 0;
                e.soDuT2 = Formatter(e.soDuT2) || 0;
                e.soDu = Formatter(e.soDu) || 0;
                e.choThanhToan = Formatter(e.choThanhToan) || 0;
                e.tongSoTien = Formatter(e.tongSoTien) || 0;
            })
            dispatch(fetchBankAccount(res.data))
            let temp = []
            temp.push(res.data[0])
            setTableData(temp);
        }

        fetchApi()
    }, [])
    const handleChangeBankAccount = (value) => {
        let result = {}
        let temp = []
        BankAccount.forEach((bank) => {
            if (parseInt(bank.stk) === parseInt(value))
                result = bank
        })
        temp.push(result)
        setTableData(temp)

    }

    const getListBankAccount = BankAccount?.map((acc, index) => {
        let value = acc.nganHang.tenNganHang + ' - ' + acc.stk
        return (
            <Picker.Item key={index} label={value} value={acc.stk} style={{ fontSize: 16 }} />
        )
    })


    return (
        <View style={styles.container}>
            <View style={styles.styleSelect}>
                <Picker
                    name='phai'
                    selectedValue={tableData[0]?.stk}
                    onValueChange={handleChangeBankAccount}
                >
                    {getListBankAccount}
                </Picker>
            </View>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }}>
                        <Row data={columns} widthArr={widthArr} style={styles.header} textStyle={styles.textHeader} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }}>
                            {
                                tableData.map((rowData, index) => {

                                    const allowed = ['nganHang', 'stk'];

                                    const filtered = Object.keys(rowData)
                                        .filter(key => !allowed.includes(key))
                                        .reduce((obj, key) => {
                                            obj[key] = rowData[key];
                                            return obj;
                                        }, {});
                                    let data = Object.values(filtered)
                                    return (
                                        <Row
                                            key={index}
                                            data={data}
                                            widthArr={widthArr}
                                            style={[styles.row, index % 2 && { backgroundColor: '#F0FBFC' }]}
                                            textStyle={styles.textBody}
                                        />
                                    )
                                })
                            }
                        </Table>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: { padding: 5, paddingTop: 5, backgroundColor: '#fff' },
    header: { height: 50, backgroundColor: '#37C2D0' },
    textHeader: { textAlign: 'center', fontWeight: '100', color: '#fff', fontSize: 16, fontWeight: 'bold' },
    textBody: { textAlign: 'center', fontWeight: '100', fontWeight: 'bold', fontSize: 15 },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#fff' },
    styleSelect: { paddingTop: 20, paddingBottom: 20, width: 300 }
});