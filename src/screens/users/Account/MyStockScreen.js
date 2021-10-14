import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Row, Table } from 'react-native-table-component';
import * as Api from '../../../api/Account';
import Formatter from '../../../helpers/formatNumber'

export default function MyStockScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCP', 'Số lượng', 'Tổng số', 'Số lượng T0', 'Số lượng T1', 'Số lượng T2', 'Giá TT', 'Giá trị TT'])
    const [widthArr, setWidthArr] = useState([80, 80, 80, 100, 100, 100, 80, 100])
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                const res = await Api.MyStocks()
                res.data.list.forEach((e) => {
                    e.soLuong = Formatter(e.soLuong);
                    e.soLuongT0 = Formatter(e.soLuongT0);
                    e.soLuongT1 = Formatter(e.soLuongT1);
                    e.soLuongT2 = Formatter(e.soLuongT2);
                    e.tongSo = Formatter(e.tongSo);
                    e.giaTT = Formatter(e.giaTT);
                    e.giaTriTT = Formatter(e.giaTriTT);
                })
                setTableData(res.data.list);
            }
            console.log('===============my stock================');
            fetchApi()
        });


        return unsubscribe;
    }, [navigation]);


    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}>
                <View>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }}>
                        <Row data={columns} widthArr={widthArr} style={styles.header} textStyle={styles.textHeader} />
                    </Table>
                    <ScrollView style={styles.dataWrapper}>
                        <Table borderStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }}>
                            {
                                tableData.map((rowData, index) => {
                                    let data = Object.values(rowData)
                                    for (let i = 0; i < data.length; i++) {
                                        if (i === 0)
                                            data[i] = data[i].trim();

                                    }
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
    textBody: { textAlign: 'center', fontWeight: '100', fontWeight: 'bold' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#fff' }
});