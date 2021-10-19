import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Api from '../../../api/Statement';
import styles from '../../../common/StyleTable';
import Formatter from '../../../helpers/formatNumber';
import queryString from 'query-string';

export default function PurchasedOneDayScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCK', 'Mua/Bán', 'KL Khớp/Tổng KL', 'Trạng thái', 'Hùy lệnh'])

    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                const res = await Api.PurchasedOneDay()
                setTableData(res.data.list)
            }
            fetchApi()
        });


        return unsubscribe;
    }, [navigation]);

    const tableHeader = () => (
        <View style={styles.tableHeaderDetail}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeader}>
                                <Text style={styles.columnHeaderTxt}>{column}</Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )
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
                        </ScrollView>
                    )
                }}
            />
        </View>
    )
}