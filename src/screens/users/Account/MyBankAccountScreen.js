import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Api from '../../../api/Account';
import styles from '../../../common/StyleTable';
import styleModal from '../../../common/styleModal';
import Formatter from '../../../helpers/formatNumber';
import { fetchBankAccount } from '../../../store/users/BankAccount';
import RBSheet from 'react-native-raw-bottom-sheet';
import * as Price from '../../../constants/Price';
import Modal from "react-native-modal";
export default function MyBankAccountScreen({ navigation }) {
    const BankAccount = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()
    const columnPortrait = ['STK', 'Số dư TK', 'Tổng số tiền']
    const [columns, setColumns] = useState(['STK', 'Số dư TK', 'Tổng số tiền'])
    const [detail, setDetail] = useState(['Số dư T0', 'Số dư T1', 'Số dư T2', 'Bán chờ thanh toán'])
    const columnLandscape = ['STK', 'Số dư TK', 'Tổng số tiền', 'Bán chờ thanh toán', 'Số dư T0', 'Số dư T1', 'Số dư T2']
    const [tableData, setTableData] = useState([])
    const refRBSheet = useRef();
    const [currentSTK, setCurrentSTK] = useState([])
    const [orientation, setOrientation] = useState();

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
        setTableData(res.data);
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const isPortrait = () => {
                const dim = Dimensions.get('screen');
                return dim.height >= dim.width;
            };
            if (isPortrait()) {
                setColumns(columnPortrait)
                setOrientation("PORTRAIT")
            } else {
                setOrientation("LANDSCAPE")
                setColumns(columnLandscape)
            }
            fetchApi()
            console.log('bank');
        });
        return unsubscribe;
    }, [navigation]);
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setColumns(columnPortrait)
                setOrientation("PORTRAIT")
            } else {
                setColumns(columnLandscape)
                setOrientation("LANDSCAPE")
            }
        })
        return () => subscription?.remove();
    });

    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {orientation === 'PORTRAIT' ?
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.columnHeader, width: '33.33%' }}>
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
                                style={{ ...styles.columnHeader, width: '14.2%' }}>
                                <Text style={{ ...styles.columnHeaderTxt, fontSize: 14 }}>{column}</Text>
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
    const YourOwnComponent = () =>
        <View style={styleModal.centeredView}>
            <View style={styleModal.modalView}>
                <Text style={{ ...styles.textTitleRBSheet, fontSize: 15 }}>{currentSTK.nganHang.tenNganHang} - {currentSTK.stk}</Text>
                <FlatList
                    style={{ paddingTop: 5 }}
                    ListHeaderComponent={tableHeaderDetail()}
                />
                <View style={{ ...styles.tableRow, backgroundColor: "#F0FBFC", paddingBottom: 20 }}>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.soDuT0) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.soDuT1) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.soDuT2) || '0'}</Text>
                    <Text style={{ ...styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentSTK.choThanhToan) || '0'}</Text>
                </View>
                <Button title="Đóng" onPress={() => setModalVisible(false)} />
            </View>
        </View>;
    return (
        <>
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
                                        <Text style={{ ...styles.columnRowTxt, fontWeight: "bold", width: "40%" }} onPress={() => toggleModal(item)}>
                                            {item.stk.trim()}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, width: "30%", }}>{item.soDu}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, width: "30%", }}>{item.tongSoTien}</Text>
                                    </> :
                                    <>
                                        <Text style={{ ...styles.columnRowTxt, fontWeight: "bold", width: "20%" }}>
                                            {item.stk.trim()}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, fontSize: 13, width: "13.3%", }}>{item.soDu}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, fontSize: 13, width: "13.3%", }}>{item.tongSoTien}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, fontSize: 13, width: "13.3%", }}>{item.choThanhToan}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, fontSize: 13, width: "13.3%", }}>{item.soDuT0}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, fontSize: 13, width: "13.3%", }}>{item.soDuT1}</Text>
                                        <Text style={{ ...styles.columnRowTxt3, fontSize: 13, width: "13.3%", }}>{item.soDuT2}</Text>
                                    </>
                                }
                            </View>

                        )
                    }}
                />

            </View>
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

        </>
    )
}