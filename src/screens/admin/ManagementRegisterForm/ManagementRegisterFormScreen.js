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
import { format } from 'date-fns';

export default function ManagementRegisterFormScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaDK', 'Họ Tên', 'Ngày sinh', 'SĐT'])

    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                const res = await Api.ListRegisterForm()
                setTableData(res.data.list)
                console.log(res.data.list)
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
                                    style={{ ...Styles.columnRowTxt, fontWeight: "bold", width: '20%' }}
                                // onPress={() => onClickStock(item)}
                                >
                                    {item.maDon}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '30%' }}>{item.ho} {item.ten}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '25%' }}>{format(new Date(item.ngaySinh), 'dd/MM/yyyy')}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '25%' }}>{item.sdt}</Text>
                            </View>
                        </ScrollView>
                    )
                }}
            />
        </View>
    )
}