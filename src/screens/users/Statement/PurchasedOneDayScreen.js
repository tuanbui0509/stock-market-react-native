import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Api from '../../../api/Statement';
import styleModal from '../../../common/styleModal';
import Styles from '../../../common/StyleTable';
import Color from '../../../constants/Colors';
import Formatter from '../../../helpers/formatNumber';
import Loading from '../../../helpers/Loading';
import * as notification from '../../../helpers/Notification';
export default function PurchasedOneDayScreen({ navigation }) {
    const [columns, setColumns] = useState(['MaCK', 'Mua/Bán', 'KLượng Khớp/Tổng KLượng', 'Trạng thái', 'Giá khớp'])
    const [detail, setDetail] = useState(['Giá', 'Tổng KL', 'SL Khớp', 'Hủy lệnh'])
    const [currentMaCK, setCurrentMaCK] = useState([])
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchApi()
        });
        return unsubscribe;
    }, [navigation]);
    const fetchApi = async () => {
        const res = await Api.PurchasedOneDay()
        setTableData(res.data.list)
    }
    useEffect(() => {
        fetchApi()
    }, []);

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
    const ClassNameRender = (val) => {
        if (val === 'CK')
            return Color.yellow
        else if (val === 'KH' || val === 'KP')
            return Color.green
        else
            return Color.red
    }
    const tableHeaderDetail = () => (
        <View style={Styles.tableHeaderDetail}>
            {
                detail.map((column, index) => {
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

    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [isCancelVisible, setCancelVisible] = useState(false);

    const toggleModal = (item) => {
        setCurrentMaCK(item)
        setVisible(!visible);
    };
    const toggleModalCancel = (item) => {
        setCurrentMaCK(item)
        setCancelVisible(!isCancelVisible);
    };
    const YourOwnComponent = () =>
        <View style={styleModal.centeredView}>
            <View style={styleModal.modalView}>
                <Text style={{ ...Styles.textTitleRBSheet, fontSize: 16 }}>STK: {currentMaCK.stk}</Text>
                <Text style={{ ...Styles.textTitleRBSheet, fontSize: 16 }}>Thời gian: {format(new Date(currentMaCK.thoiGian), 'dd/MM/yyyy kk:mm:ss')}</Text>
                <FlatList
                    style={{ paddingTop: 5 }}
                    ListHeaderComponent={tableHeaderDetail()}
                />
                <View style={{ ...Styles.tableRow, backgroundColor: "#F0FBFC", paddingBottom: 20 }}>
                    <Text style={{ ...Styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentMaCK.gia) || '0'}</Text>
                    <Text style={{ ...Styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentMaCK.soLuong) || '0'}</Text>
                    <Text style={{ ...Styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentMaCK.slKhop) || '0'}</Text>
                    {/* <Text style={{ ...Styles.textBodyRBSheet, width: '25%', fontSize: 13 }}>{Formatter(currentMaCK.giaTriKhop) || '0'}</Text> */}
                    <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }} onPress={() => toggleModalCancel(currentMaCK)}>
                        {currentMaCK.maTT.trim() === 'CK' ? <Icon
                            name="times"
                            color={Color.red}
                            size={15}
                        /> : null}
                    </Text>
                </View>
                <Button title="Đóng" onPress={() => setVisible(false)} />
            </View>
        </View>;


    const YourCancelComponent = () =>
        <View style={{ ...styleModal.modalView, margin: 0, padding: 15 }}>
            <Text style={{ ...styles.textTitle, fontWeight: 'bold', fontSize: 18, color: '#000' }}>Bạn có muốn hủy lệnh này không?</Text>
            <View style={styles.wrapperLabel}>
                <TouchableOpacity onPress={handleOkDelete}>
                    <LinearGradient
                        colors={['#F8495A', Color.red]}
                        style={{ ...styles.appButtonContainer, width: 120, marginRight: 20 }}
                    >
                        <Text style={styles.appButtonText}>Xác nhận</Text>
                    </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setCancelVisible(false)}>
                    <LinearGradient
                        colors={['#fff', '#fff']}
                        style={{ ...styles.appButtonContainer, width: 120 }}
                    >
                        <Text style={{ ...styles.appButtonText, color: '#333' }}>Hủy bỏ</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        </View>

    const handleOkDelete = async () => {
        const res = await Api.CancelStock(currentMaCK.maLD)
        if (res.data.status === 0) {
            setLoading(true)
            setTimeout(() => {
                setLoading(false)
                notification.SuccessNotification(res.data.message)
            }, 3000);
            fetchApi()
        }
        else {
            notification.DangerNotification(res.data.message)
        }
        setCancelVisible(false);
        setVisible(false)
    }

    return (
        <View style={Styles.container}>
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
                                    style={{ ...Styles.columnRowTxt, fontWeight: "bold", width: '20%', }}
                                    onPress={() => toggleModal(item)}
                                >
                                    {item.maCP.trim()}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: item.loaiGiaoDich ? Color.green : Color.red }}>{item.loaiGiaoDich ? 'Mua' : 'Bán'}</Text>
                                <Text style={{ ...Styles.columnRowTxtLight, width: '20%' }}>{Formatter(item.slKhop) || '0'}/{Formatter(item.soLuong)}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: ClassNameRender(item.maTT.trim()) }}>{item.tenTrangThai}</Text>
                                <Text style={{ ...Styles.columnRowTxt, width: '20%', color: ClassNameRender(item.maTT.trim()) }}>{Formatter(item.gia)}</Text>
                            </View>
                        </ScrollView>
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

            <Overlay
                isVisible={isCancelVisible}
                onBackdropPress={() => setCancelVisible(false)}
                overlayStyle={{ backgroundColor: 'transparent' }}
            >
                <YourCancelComponent />
            </Overlay>

            <Loading loading={loading} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    titleText: {
        padding: 8,
        fontSize: 16,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    headingText: {
        padding: 8,
    },
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 40,
        width: '100%',
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        fontSize: 16
    },
    content_wp: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 20,
        marginBottom: 10

    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        textAlign: 'center'
    },
    textStyle: {
        paddingVertical: 10,
        height: 40,
        width: '80%',
        marginLeft: 10,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
    },
    box_stk: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    textSelect: {
        marginTop: 5,
        // width: '100%',
        paddingLeft: 30,
        // height: 150
        maxHeight: 150
    },
    box_cp: {
        marginBottom: 5
    },
    textTitle: {
        fontSize: 18,
        marginBottom: 5,
        color: '#888'
    },
    textLabel: {
        fontSize: 18,
        fontWeight: "bold",
    },
    appButtonContainer: {
        marginTop: 10,
        // elevation: 10,
        borderRadius: 8,
        paddingVertical: 8,
        // height: 40,
        paddingHorizontal: 12,
        width: 150,
        borderWidth: 1,
        borderColor: '#d5d5d5',
    },
    appButtonText: {
        fontSize: 16,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    wrapperLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    contentLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        marginBottom: 10
    }
});