import React, { useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Api from '../../../api/Statement';
import styles from '../../../common/StyleTable';
import Formatter from '../../../helpers/formatNumber';
import queryString from 'query-string';

export default function PurchasedOneDayScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCP', 'Khả dụng', 'Giá TT', 'Giá trị TT'])
    const [tableData, setTableData] = useState([])
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    })
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                // const paramsString = queryString.stringify(pagination);
                // const res = await Api.PurchasedOneDay()
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

    return (
        <View style={styles.container}>
            <FlatList
                data={tableData}
                style={{ width: "98%", paddingTop: 5 }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                            <Text
                                style={{ ...styles.columnRowTxt, fontWeight: "bold" }}
                            // onPress={() => onClickStock(item)}
                            >
                                {item.maCp.trim()}</Text>
                            {/* <Text style={styles.columnRowTxtLight}>{item.tongSo}</Text> */}
                            <Text style={styles.columnRowTxt4}>{item.soLuong}</Text>
                            <Text style={styles.columnRowTxt4}>{item.giaTT}</Text>
                            <Text style={styles.columnRowTxt4}>{item.giaTriTT}</Text>
                        </View>

                    )
                }}
            />
        </View>
    )
}