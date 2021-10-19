import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash";
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as Api from '../../../api/LightningTable';
import CustomHeader from '../../../components/CustomHeader';
import Color from '../../../constants/Colors';
import Formatter from '../../../helpers/formatNumber'
import * as Price from '../../../constants/Price';
import styles from '../../../common/StyleTable';
function LightningTableScreen(props) {
    const refRBSheet = useRef();
    let { navigation } = props
    const [columns, setColumns] = useState(['MaCK', 'TC', 'Trần', 'Sàn', 'Tổng KL'])
    const detailBuy = ['Giá 3', 'KL 3', 'Giá 2', 'KL 2', 'Giá 1', 'KL 1']
    const detailSell = ['Giá 1', 'KL 1', 'Giá 2', 'KL 2', 'Giá 3', 'KL 3']
    const detailHead = ['Giá khớp', 'KL khớp']
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [tableData, setTableData] = useState([])
    const [currentStock, setCurrentStock] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                const res = await Api.LightningTable()
                setTableData(res.data);
            }
            fetchApi()
        });

        return unsubscribe;
    }, [navigation]);
    const tableHeader = () => (
        <View style={styles.tableHeader}>
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

    const tableHeaderDetail = (detailBuy) => (
        <View style={styles.tableHeaderDetail}>
            {
                detailBuy.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeader} >
                                <Text style={styles.columnHeaderTxt}>{column}

                                </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )

    const tableHeaderDetailHead = () => (
        <View style={styles.tableHeaderDetail}>
            {
                detailHead.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeaderDetail} >
                                <Text style={styles.columnHeaderTxt}>{column}</Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )


    const onClickStock = (item) => {
        setCurrentStock(item)
        refRBSheet.current.open()
    }

    const ClassNameRender = (giaTran, giaSan, giaTC, val) => {
        if (val === giaTran)
            return Color.floor
        else if (val === giaSan)
            return Color.ceil
        else if (val === giaTC)
            return Color.standard
        else if (val < giaTC)
            return Color.red
        else
            return Color.skyBlue
    }

    const YourOwnComponent = () =>
        <View style={styles.containerRBSheet}>


            {/* Ben mua */}
            <Text style={styles.textTitleRBSheet}>Giá bên mua</Text>
            <View style={styles.containerRBSheet}>
                <FlatList
                    style={{ width: "98%", paddingTop: 5 }}
                    ListHeaderComponent={tableHeaderDetail(detailBuy)}
                    stickyHeaderIndices={[0]}

                />
                <View style={{ ...styles.tableRow, backgroundColor: "#F0FBFC" }}>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaMua3) }}>{Formatter(currentStock.giaMua3 / Price.PRICE) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaMua3) }}>{Formatter(currentStock.klMua3) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaMua2) }}>{Formatter(currentStock.giaMua2 / Price.PRICE) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaMua2) }}>{Formatter(currentStock.klMua2) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaMua1) }}>{Formatter(currentStock.giaMua1 / Price.PRICE) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaMua1) }}>{Formatter(currentStock.klMua1) || '0'}</Text>
                </View>
            </View>
            {/* khop */}
            <Text style={styles.textTitleRBSheet}>Khớp lệnh</Text>
            <View style={styles.containerRBSheet}>
                <FlatList
                    style={{ width: "98%", paddingTop: 5 }}
                    ListHeaderComponent={tableHeaderDetailHead}
                />
                <View style={{ ...styles.tableRow, backgroundColor: "#F0FBFC" }}>
                    <Text style={{ ...styles.textBodyRBSheet_main, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.gia) }}>{Formatter(currentStock.gia / Price.PRICE)}</Text>
                    <Text style={{ ...styles.textBodyRBSheet_main, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.gia) }}>{Formatter(currentStock.kl) || '0'}</Text>
                </View>
            </View>
            {/* ben ban */}
            <Text style={styles.textTitleRBSheet}>Giá bên bán</Text>
            <View style={styles.containerRBSheet}>
                <FlatList
                    style={{ width: "98%", paddingTop: 5 }}
                    ListHeaderComponent={tableHeaderDetail(detailSell)}
                    stickyHeaderIndices={[0]}

                />
                <View style={{ ...styles.tableRow, backgroundColor: "#F0FBFC" }}>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaBan1) }}>{Formatter(currentStock.giaBan1 / Price.PRICE)}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaBan1) }}>{Formatter(currentStock.klBan1) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaBan2) }}>{Formatter(currentStock.giaBan2 / Price.PRICE)}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaBan2) }}>{Formatter(currentStock.klBan2) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaBan3) }}>{Formatter(currentStock.giaBan3 / Price.PRICE)}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, color: ClassNameRender(currentStock.giaTran, currentStock.giaSan, currentStock.giaTC, currentStock.giaBan3) }}>{Formatter(currentStock.klBan3) || '0'}</Text>
                </View>
            </View>
        </View>;
    return (
        <View style={styles.container} >
            <CustomHeader title="Bảng diện thị trường" isHome={true} navigation={navigation} />
            <FlatList
                data={tableData}
                style={{ width: "98%", paddingTop: 20 }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                            <Text
                                style={{ ...styles.columnRowTxt, fontWeight: "bold", color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}
                                onPress={() => onClickStock(item)}
                            >
                                {item.macp.trim()}</Text>
                            <Text style={styles.columnRowStandard}>{item.giaTC / Price.PRICE}</Text>
                            <Text style={styles.columnRowCeil}>{item.giaTran / Price.PRICE}</Text>
                            <Text style={styles.columnRowFloor}>{item.giaSan / Price.PRICE}</Text>
                            <Text style={styles.columnRowTxt}>{item.ktTong || '0'}</Text>
                        </View>

                    )
                }}
            />

            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                closeOnDragDown={true}
                animationType='slide'
                height={380}
                dragFromTopOnly={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "rgb(0, 105, 196)"
                    }
                }}
            >
                <YourOwnComponent />
            </RBSheet>
        </View>

    )
}
export default LightningTableScreen
