import React, { useEffect, useState } from 'react'
import { Button, Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native'
import { Overlay } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import * as Api from '../../../api/Account'
import styleModal from '../../../common/styleModal'
import styles from '../../../common/StyleTable'
import Formatter from '../../../helpers/formatNumber'
import { fetchBankAccount } from '../../../store/users/BankAccount'

export default function MyBankAccountScreen({ navigation }) {
    const BankAccount = useSelector(state => state.BankAccount)
    const dispatch = useDispatch()
    const [columns, setColumns] = useState(['STK', 'Số dư TK', 'Số dư khả dụng', 'Tổng số tiền'])
    const [detail, setDetail] = useState(['Số dư T0', 'Số dư T1', 'Số dư T2', 'Bán chờ thanh toán'])
    const [tableData, setTableData] = useState([])
    const [currentSTK, setCurrentSTK] = useState([])

    const fetchApi = async () => {
        const res = await Api.MyBankAccount()
        res.data.forEach((e) => {
            e.soDuT0 = Formatter(e.soDuT0) || 0
            e.soDuT1 = Formatter(e.soDuT1) || 0
            e.soDuT2 = Formatter(e.soDuT2) || 0
            e.soDu = Formatter(e.soDu) || 0
            e.khaDung = Formatter(e.khaDung) || 0
            e.choThanhToan = Formatter(e.choThanhToan) || 0
            e.tongSoTien = Formatter(e.tongSoTien) || 0
        })
        dispatch(fetchBankAccount(res.data))
        setTableData(res.data)
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchApi()
        })
        return unsubscribe
    }, [navigation])

    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.columnHeader, width: '25%', padding: 0 }}>
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



    const [visible, setVisible] = useState(false)
    const toggleOverlay = () => {
        setVisible(!visible)
    }

    const toggleModal = (item) => {
        setCurrentSTK(item)
        setVisible(!visible)
    }
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
                <Button title="Đóng" onPress={() => setVisible(false)} />
            </View>
        </View>
    return (
        <>
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

                                <Text style={{ ...styles.columnRowTxt, fontWeight: "bold", width: "30%", fontSize: 13 }} onPress={() => toggleModal(item)}>
                                    {item.stk.trim()}</Text>
                                <Text style={{ ...styles.columnRowTxt3, fontSize: 14, width: "20%", }}>{item.soDu}</Text>
                                <Text style={{ ...styles.columnRowTxt3, fontSize: 14, width: "25%", }}>{item.khaDung}</Text>
                                <Text style={{ ...styles.columnRowTxt3, fontSize: 14, width: "25%", }}>{item.tongSoTien}</Text>
                            </View>

                        )
                    }}
                />

            </View>
            <Overlay
                isVisible={visible}
                onBackdropPress={toggleOverlay}
                overlayStyle={{ backgroundColor: 'transparent' }}
            >
                <YourOwnComponent />
            </Overlay>

        </>
    )
}