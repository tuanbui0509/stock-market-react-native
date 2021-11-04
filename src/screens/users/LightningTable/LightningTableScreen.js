import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Api from '../../../api/LightningTable';
import config from "../../../axios/config";
import styles from '../../../common/StyleTable';
import CustomHeader from '../../../components/CustomHeader';
import Color from '../../../constants/Colors';
import * as Price from '../../../constants/Price';
import Formatter from '../../../helpers/formatNumber';
import { FetchChangeListStocks, fetchLightningTable } from '../../../store/common/LightningTable';

function LightningTableScreen(props) {
    let { navigation } = props
    const columnPortrait = ['MaCK', 'TC', 'Trần', 'Sàn', 'Tổng KL']
    const columnLandscape = ['MaCK', 'TC', 'Trần', 'Sàn', 'Giá mua 3', 'KL 3', 'Giá mua 2', 'KL 2', 'Giá mua 1', 'KL 1', 'Giá khớp', 'KL khớp', 'Giá bán 1', 'KL 1', 'Giá bán 2', 'KL 2', 'Giá bán 3', 'KL 3', 'Tổng KL']
    const [columns, setColumns] = useState([])
    const [orientation, setOrientation] = useState("PORTRAIT");
    const dispatch = useDispatch();
    const LightningTable = useSelector(state => state.LightningTable)
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const fetchApi = async () => {
                const res = await Api.LightningTable()
                dispatch(fetchLightningTable(res.data))
            }
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
        });
        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setColumns(columnPortrait)
                setOrientation("PORTRAIT")
                console.log('PORTRAIT');
            } else {
                console.log('LANDSCAPE');
                setColumns(columnLandscape)
                setOrientation("LANDSCAPE")
            }
        })
    }, []);

    useEffect(() => {
        let hubConnection = new HubConnectionBuilder()
            .withUrl(config.BASE_URL + "/signalr")
            .configureLogging(LogLevel.Information)
            .build();
        hubConnection.on('message', data => {
            let json = JSON.parse(data);
            dispatch(FetchChangeListStocks(json));
        });
        hubConnection.start()
    }, []);
    const tableHeader = () => (
        <View style={styles.tableHeader}>
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
                                style={{ ...styles.columnHeader, width: '5.263157894736842%' }} >
                                <Text style={{ ...styles.columnHeaderTxt, fontSize: 11, textAlign: 'center' }}>{column} </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }

        </View>
    )

    const ClassNameRender = (giaTran, giaSan, giaTC, val) => {
        if (val === giaTran)
            return Color.ceil
        else if (val === giaSan)
            return Color.floor
        else if (val === giaTC)
            return Color.standard
        else if (val < giaTC)
            return Color.red
        else
            return Color.green
    }

    return (
        <View style={styles.container} >
            <CustomHeader title="Bảng diện thị trường" isHome={true} navigation={navigation} />
            <FlatList
                data={LightningTable}
                style={{ width: "99%", paddingTop: 10 }}
                keyExtractor={(item, index) => index + ""}
                ListHeaderComponent={tableHeader}
                stickyHeaderIndices={[0]}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                            {orientation === 'PORTRAIT' ?
                                <>
                                    <Text
                                        style={{ ...styles.columnRowTxt, fontWeight: "bold", color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}
                                    >
                                        {item.macp.trim()}</Text>
                                    <Text style={styles.columnRowStandard}>{item.giaTC / Price.PRICE}</Text>
                                    <Text style={styles.columnRowCeil}>{item.giaTran / Price.PRICE}</Text>
                                    <Text style={styles.columnRowFloor}>{item.giaSan / Price.PRICE}</Text>
                                    <Text style={styles.columnRowTxt}>{item.ktTong || '0'}</Text>
                                </> :
                                <>
                                    <Text
                                        style={{ ...styles.columnRowTxt, fontSize: 12, fontWeight: "bold", width: "5.263157894736842%", color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}
                                    >
                                        {item.macp.trim()}</Text>
                                    <Text style={{ ...styles.columnRowStandard, fontSize: 12, width: "5.263157894736842%" }}>{item.giaTC / Price.PRICE}</Text>
                                    <Text style={{ ...styles.columnRowCeil, fontSize: 12, width: "5.263157894736842%" }}>{item.giaTran / Price.PRICE}</Text>
                                    <Text style={{ ...styles.columnRowFloor, fontSize: 12, width: "5.263157894736842%" }}>{item.giaSan / Price.PRICE}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua3) }}>{item.giaMua3 / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua3) }}>{Formatter(item.klMua3) || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua2) }}>{item.giaMua2 / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua2) }}>{Formatter(item.klMua2) || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua1) }}>{item.giaMua1 / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua1) }}>{Formatter(item.klMua1) || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}>{item.gia / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}>{Formatter(item.kl) || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan1) }}>{item.giaBan1 / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan1) }}>{Formatter(item.klBan1) || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan2) }}>{item.giaBan2 / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan2) }}>{Formatter(item.klBan2) || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan3) }}>{item.giaBan3 / Price.PRICE || '0'}</Text>
                                    <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan3) }}>{Formatter(item.klBan3) || '0'}</Text>
                                    <Text style={styles.columnRowTxtLandscape}>{item.ktTong || '0'}</Text>
                                </>
                            }


                        </View>

                    )
                }}
            />
        </View>

    )
}
export default LightningTableScreen
