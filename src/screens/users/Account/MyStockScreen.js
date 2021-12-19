import React, { useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import * as Api from '../../../api/Account';
import styleModal from '../../../common/styleModal';
import styles from '../../../common/StyleTable';
import Formatter from '../../../helpers/formatNumber';


export default function MyStockScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCP', 'Tổng', 'Khả dụng', 'Giá TT', 'Giá trị TT'])
    const [detail, setDetail] = useState(['MaCP', 'Số dư T0', 'Số dư T1', 'Số dư T2'])
    const [tableData, setTableData] = useState([])
    const [currentSTK, setCurrentSTK] = useState([])



    const fetchApi = async () => {
        const res = await Api.MyStocks()
        res.data.list.forEach((e) => {
            e.soLuong = Formatter(e.soLuong);
            e.soLuongT0 = Formatter(e.soLuongT0);
            e.soLuongT1 = Formatter(e.soLuongT1);
            e.soLuongT2 = Formatter(e.soLuongT2);
            e.tongSo = Formatter(e.tongSo);
            e.giaTT = Formatter(e.giaTT);
            e.giaTriTT = Formatter(e.giaTriTT) || '0';
        })
        setTableData(res.data.list);
    }

    useEffect(() => {

        fetchApi()
    }, [])
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

    const tableHeaderDetail = () => (
        <View style={styles.tableHeaderDetail}>
            {
                detail.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.columnHeader, width: '25%' }} >
                                <Text style={{ ...styles.columnHeaderTxt, fontSize: 13 }}>{column} </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )

    const toggleModal = (item) => {
        setCurrentSTK(item)
        setVisible(!visible);
    };

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const YourOwnComponent = () =>
        <View style={styleModal.centeredView}>
            <View style={styleModal.modalView}>
                <FlatList
                    style={{ paddingTop: 5 }}
                    ListHeaderComponent={tableHeaderDetail()}
                />
                <View style={{ ...styles.tableRow, backgroundColor: "#F0FBFC", paddingBottom: 20 }}>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{(currentSTK.maCp.trim())}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.soLuongT0) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.soLuongT1) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.soLuongT2) || '0'}</Text>
                </View>
                <Button title="Đóng" onPress={() => setVisible(false)} />
            </View>
        </View>;
    return (
        <View style={styles.container}>
            <FlatList
                data={tableData}
                style={{ width: "98%", paddingTop: 10 }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                            <Text
                                style={{ ...styles.columnRowTxt, fontWeight: "bold" }}
                                onPress={() => toggleModal(item)} >
                                {item.maCp.trim()}</Text>
                            <Text style={styles.columnRowTxt}>{item.tongSo}</Text>
                            <Text style={styles.columnRowTxt}>{item.soLuong}</Text>
                            <Text style={styles.columnRowTxt}>{item.giaTT}</Text>
                            <Text style={styles.columnRowTxt}>{item.giaTriTT}</Text>

                        </View>

                    )
                }}
            />
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ backgroundColor: 'transparent' }}
            >
                <YourOwnComponent />
            </Overlay>
        </View>
    )
}