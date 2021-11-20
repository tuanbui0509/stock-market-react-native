import React, { useEffect, useState } from 'react';
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import * as Api from '../../../api/Account';
import styles from '../../../common/StyleTable';
import Formatter from '../../../helpers/formatNumber';
import Modal from "react-native-modal";
import styleModal from '../../../common/styleModal';


export default function MyStockScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCP', 'Tổng', 'Khả dụng', 'Giá TT', 'Giá trị TT'])
    const columnLandscape = ['MaCP', 'Tổng', 'Khả dụng', 'T0', 'T1', 'T2', 'Giá TT', 'Giá trị TT']

    const [detail, setDetail] = useState(['MaCP', 'Số dư T0', 'Số dư T1', 'Số dư T2'])
    const [tableData, setTableData] = useState([])
    const [currentSTK, setCurrentSTK] = useState([])
    const [orientation, setOrientation] = useState();



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
    const isPortrait = () => {
        const dim = Dimensions.get('screen');
        return dim.height >= dim.width;
    };
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (isPortrait()) {
                setColumns(columns)
                setOrientation("PORTRAIT")
            } else {
                setOrientation("LANDSCAPE")
                setColumns(columnLandscape)
            }
            console.log('stock');
            fetchApi()
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        if (isPortrait()) {
            setColumns(columns)
            setOrientation("PORTRAIT")
        } else {
            setOrientation("LANDSCAPE")
            setColumns(columnLandscape)
        }
        fetchApi()
    }, [])
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setColumns(columns)
                setOrientation("PORTRAIT")
            } else {
                setColumns(columnLandscape)
                setOrientation("LANDSCAPE")
            }
        })
        return () => subscription?.remove();
    });

    const tableHeader = () => (
        <View style={styles.tableHeaderDetail}>
            {orientation === 'PORTRAIT' ?
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
                }) :
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.columnHeader, width: '12.5%' }} >
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



    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = (item) => {
        setCurrentSTK(item)
        setModalVisible(!isModalVisible);
    };

    // responsive
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setColumns(columns)
                setOrientation("PORTRAIT")
            } else {
                setColumns(columnLandscape)
                setOrientation("LANDSCAPE")
            }
        })
        return () => subscription?.remove();
    });
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
                <Button title="Đóng" onPress={() => setModalVisible(false)} />
            </View>
        </View>;
    return (
        <View style={styles.container}>
            <FlatList
                data={tableData}
                style={{ width: "98%", paddingTop: 20 }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                            {orientation === 'PORTRAIT' ?
                                <>
                                    <Text
                                        style={{ ...styles.columnRowTxt, fontWeight: "bold" }}
                                        onPress={() => toggleModal(item)} >
                                        {item.maCp.trim()}</Text>
                                    <Text style={styles.columnRowTxt}>{item.tongSo}</Text>
                                    <Text style={styles.columnRowTxt}>{item.soLuong}</Text>
                                    <Text style={styles.columnRowTxt}>{item.giaTT}</Text>
                                    <Text style={styles.columnRowTxt}>{item.giaTriTT}</Text>
                                </> :
                                <>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%', fontWeight: "bold" }}>
                                        {item.maCp.trim()}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.tongSo}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.soLuong}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.giaTT}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.soLuongT0}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.soLuongT1}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.soLuongT2}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '12.5%' }}>{item.giaTriTT}</Text>
                                </>
                            }
                        </View>

                    )
                }}
            />
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(false)}
                testID={'modal'}
                backdropOpacity={0.8}
                animationIn="zoomInDown"
                animationOut="zoomOutUp"
                animationInTiming={600}
                animationOutTiming={600}
                backdropTransitionInTiming={600}
                backdropTransitionOutTiming={600}
            >
                <YourOwnComponent />
            </Modal>
        </View>
    )
}