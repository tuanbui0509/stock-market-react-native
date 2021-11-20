import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, LogBox, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Api from '../../../api/LightningTable';
import config from "../../../axios/config";
import styles from '../../../common/StyleTable';
import Color from '../../../constants/Colors';
import * as Price from '../../../constants/Price';
import Formatter from '../../../helpers/formatNumber';
import { FetchChangeListStocks, fetchLightningTable } from '../../../store/common/LightningTable';
import { fetchLightningTableFavored } from '../../../store/common/LightningTableFavored';
import * as notification from '../../../helpers/Notification';

function LightningTableScreen(props) {
    let { navigation } = props
    const [columns, setColumns] = useState(['MaCK', 'TC', 'Trần', 'Sàn', 'Tổng KL'])
    const columnLandscape = ['MaCK', 'TC', 'Trần', 'Sàn', 'Giá mua 3', 'KL 3', 'Giá mua 2', 'KL 2', 'Giá mua 1', 'KL 1', 'Giá khớp', 'KL khớp', 'Giá bán 1', 'KL 1', 'Giá bán 2', 'KL 2', 'Giá bán 3', 'KL 3', 'Tổng KL']
    const [orientation, setOrientation] = useState()
    const dispatch = useDispatch();
    const LightningTable = useSelector(state => state.LightningTable)
    const LightningTableFavored = useSelector(state => state.LightningTableFavored)

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
            fetchApi()
        });
        return unsubscribe;
    }, [navigation]);
    const fetchApi = async () => {
        const res = await Api.LightningTable()
        dispatch(fetchLightningTable(res.data))
    }
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setColumns(columns)
                setOrientation("PORTRAIT")
                console.log("PORTRAIT");
            } else {
                setColumns(columnLandscape)
                setOrientation("LANDSCAPE")
            }
        })
        return () => subscription?.remove();
    });

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
    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {orientation === 'PORTRAIT' ?
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ ...styles.columnHeader, width: "20%", }}>
                                <Text style={{ ...styles.columnHeaderTxt, fontSize: 14 }}>{column}</Text>
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

    const handleChooseFavored = () => {

    }

    const handleCheckFavored = (macp) => {
        return LightningTableFavored.includes(macp)
    }

    const fetchApiFavored = async () => {
        const res = await Api.LightningTableFavored()
        dispatch(fetchLightningTableFavored(res.data))
    }
    const onHandleLike = async (macp) => {
        const res = await Api.PostStockFavored({ maCP: macp.trim() })
        if (res.status === 200) {
            notification.SuccessNotification('Đã thích cổ phiếu ', macp)

            fetchApi()
            fetchApiFavored()
        }
    }



    return (
        <View style={styles.container} >
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
                                    {handleCheckFavored(item.macp) ?
                                        <Pressable style={{ width: '10%' }}>
                                            <MaterialCommunityIcons
                                                name={handleCheckFavored(item.macp) ? "heart" : "heart-outline"}
                                                size={25}
                                                color={handleCheckFavored(item.macp) ? "red" : "black"}
                                            />
                                        </Pressable>
                                        : <Pressable style={{ width: '10%' }} onPress={() => onHandleLike(item.macp)}>
                                            <MaterialCommunityIcons
                                                name={handleCheckFavored(item.macp) ? "heart" : "heart-outline"}
                                                size={25}
                                                color={handleCheckFavored(item.macp) ? "red" : "black"}
                                            />
                                        </Pressable>
                                    }

                                    <Text
                                        style={{ ...styles.columnRowTxt, width: '10%', fontWeight: "bold", color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}
                                        onPress={() => handleChooseFavored()}
                                    >
                                        {item.macp?.trim()}</Text>
                                    <Text style={{ ...styles.columnRowStandard, width: '20%' }}>{item.giaTC / Price.PRICE}</Text>
                                    <Text style={{ ...styles.columnRowCeil, width: '20%' }}>{item.giaTran / Price.PRICE}</Text>
                                    <Text style={{ ...styles.columnRowFloor, width: '20%' }}>{item.giaSan / Price.PRICE}</Text>
                                    <Text style={{ ...styles.columnRowTxt, width: '20%' }}>{item.ktTong || '0'}</Text>
                                </> :
                                <>
                                    <Text
                                        style={{ ...styles.columnRowTxt, fontSize: 12, fontWeight: "bold", width: "5.263157894736842%", color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}
                                    >
                                        {item?.macp.trim()}</Text>
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
