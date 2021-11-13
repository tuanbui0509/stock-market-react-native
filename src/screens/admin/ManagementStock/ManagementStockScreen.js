import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Api from '../../../api/Admin';
import Styles from '../../../common/StyleTable';
import Formatter from '../../../helpers/formatNumber';
import queryString from 'query-string';
import Color from '../../../constants/Colors';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import Colors from '../../../constants/Colors';
import CustomHeader from '../../../components/CustomHeader';

export default function ManagementStockScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCP', 'Tên Công ty', 'Địa chỉ', 'SĐT', 'Mã sàn'])

    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                const res = await Api.ListStock()
                setTableData(res.data.list)
            }
            fetchApi()
        });


        return unsubscribe;
    }, [navigation]);

    const tableHeader = () => (
        <View style={Styles.tableHeaderDetail}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...Styles.columnHeader, width: '25%' }} >
                                <Text style={{ ...Styles.columnHeaderTxt, fontSize: 13 }}>{column} </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )

    return (
        <View style={Styles.container}>
            <CustomHeader title="Quản lý đơn đăng ký" isHome={true} navigation={navigation} />

            <FlatList
                data={tableData}
                style={{ width: "100%", marginTop: 10, height: 380 }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <ScrollView>
                            <View style={{ ...Styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                                <Text
                                    style={{ ...Styles.columnRowTxt, fontWeight: "bold" }}
                                // onPress={() => onClickStock(item)}
                                >
                                    {item.maCp.trim()}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%' }}>{item.tenCongTy}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{item.diaChi}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', }}>{item.sdt}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{item.sanGiaoDich.maSan}</Text>
                            </View>
                        </ScrollView>
                    )
                }}
            />
        </View>
    )
}