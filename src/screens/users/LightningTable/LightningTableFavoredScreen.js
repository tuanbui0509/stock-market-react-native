import { HubConnectionBuilder, LogLevel } from '@aspnet/signalr';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SearchBar, Tooltip } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as Api from '../../../api/LightningTable';
import config from "../../../axios/config";
import styles from '../../../common/StyleTable';
import Color from '../../../constants/Colors';
import * as Price from '../../../constants/Price';
import Formatter from '../../../helpers/formatNumber';
import * as notification from '../../../helpers/Notification';
import { useOrientation } from '../../../helpers/useOrientation';
import { FetchChangeListStocks, fetchLightningTableFavored } from '../../../store/common/LightningTableFavored';

function LightningTableFavoredScreen(props) {
    let { navigation } = props
    const columnLandscape = ['MaCK', 'TC', 'Trần', 'Sàn', 'Giá mua 3', 'KL 3', 'Giá mua 2', 'KL 2', 'Giá mua 1', 'KL 1', 'Giá khớp', 'KL khớp', 'Giá bán 1', 'KL 1', 'Giá bán 2', 'KL 2', 'Giá bán 3', 'KL 3', 'Tổng KL']
    const columnPortrait = ['MaCK', 'TC', 'Trần', 'Sàn', 'Tổng KL']
    const [columns, setColumns] = useState(['MaCK', 'TC', 'Trần', 'Sàn', 'Tổng KL'])
    const orientation = useOrientation()
    const LightningTable = useSelector(state => state.LightningTable)
    const LightningTableFavored = useSelector(state => state.LightningTableFavored)
    const dispatch = useDispatch();
    const isFocused = useIsFocused();
    const [search, setSearch] = useState('')
    // dynamic data
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    //static data
    const [tempFavored, setTempFavored] = useState([]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (orientation === 'PORTRAIT') {
                setColumns(columnPortrait)
            } else if (orientation === 'LANDSCAPE') {
                setColumns(columnLandscape)
            }
            setSearch('')
            fetchApiFavored()
        });
        return unsubscribe;
    }, [navigation]);

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
        fetchApiFavored()
    }, []);
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setColumns(columnPortrait)
            } else {
                setColumns(columnLandscape)
            }
        })
        return () => subscription?.remove();
    });

    useEffect(() => {
        if (orientation === 'LANDSCAPE') {
            setColumns(columnLandscape)
        }
    }, [orientation])

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

    const fetchApiFavored = async () => {
        const res = await Api.LightningTableFavored()
        dispatch(fetchLightningTableFavored(res.data))

        if (LightningTable.length > 0 && res.data.length > 0) {
            const result = LightningTable?.filter(o1 => res.data?.some(o2 => o1.macp.trim() === o2.trim()));
            setFilteredDataSource(result)
            setTempFavored(result)
        } else {
            setFilteredDataSource([])
            setTempFavored([])
        }
    }

    const onHandleUnLike = async (macp) => {
        const res = await Api.DeleteStockFavored(macp.trim())
        if (res.status === 200) {
            notification.SuccessNotification('Đâ bỏ thích cổ phiếu ', macp)
            fetchApiFavored()
            setSearch('')
        }
    }
    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            const newData = tempFavored.filter(function (item) {
                const itemData = item.macp?.trim()
                    ? item.macp?.trim().toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            setFilteredDataSource(tempFavored);
            setSearch(text);
        }
    };
    return (
        <View >
            <SearchBar
                round
                searchIcon={{ size: 20 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                showCancel={false}
                placeholder="Tìm mã cổ phiếu ..."
                platform='Android'
                lightTheme
                containerStyle={{ padding: 0, backgroundColor: '#fff' }}
                inputContainerStyle={orientation === 'PORTRAIT' ? { backgroundColor: '#f3f3f3', margin: 5 } : { width: '30%', backgroundColor: '#f3f3f3', padding: 0, margin: 0, fontSize: 13 }}
                value={search}
            />
            {isFocused ?
                <FlatList
                    data={filteredDataSource}
                    style={orientation === 'PORTRAIT' ? { width: "100%" } : { width: "100%", height: 150 }}
                    keyExtractor={(item, index) => index + ""}
                    ListHeaderComponent={tableHeader}
                    stickyHeaderIndices={[0]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ ...styles.tableRow, backgroundColor: index % 2 == 1 ? "#F0FBFC" : "white" }}>
                                {orientation === 'PORTRAIT' ?
                                    <>
                                        <Tooltip
                                            backgroundColor='#08d4c4'
                                            withOverlay={false}
                                            skipAndroidStatusBar={true}
                                            popover={
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.textTitle}>Bỏ thích: </Text>
                                                    <MaterialCommunityIcons
                                                        onPress={() => onHandleUnLike(item.macp)}
                                                        name="heart"
                                                        size={20}
                                                        color="red"
                                                    />
                                                </View>
                                            }>
                                            <Text
                                                style={{
                                                    fontWeight: "bold", marginRight: 20, marginLeft: 20,
                                                    color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia)
                                                }}
                                            > {item.macp?.trim()}</Text>
                                        </Tooltip>
                                        <Text style={styles.columnRowStandard}>{item.giaTC / Price.PRICE}</Text>
                                        <Text style={styles.columnRowCeil}>{item.giaTran / Price.PRICE}</Text>
                                        <Text style={styles.columnRowFloor}>{item.giaSan / Price.PRICE}</Text>
                                        <Text style={styles.columnRowTxt}>{item.ktTong || '0'}</Text>
                                    </> :
                                    <>
                                        <Tooltip
                                            backgroundColor='#08d4c4'
                                            withOverlay={false}
                                            skipAndroidStatusBar={true}
                                            popover={
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Text style={styles.textTitle}>Bỏ thích: </Text>
                                                    <MaterialCommunityIcons
                                                        onPress={() => onHandleUnLike(item.macp)}
                                                        name="heart"
                                                        size={20}
                                                        color="red"
                                                    />
                                                </View>
                                            }>
                                            <Text
                                                style={{
                                                    fontWeight: "bold", marginRight: 5, marginLeft: 5,
                                                    color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia)
                                                }}
                                            > {item.macp?.trim()}</Text>
                                        </Tooltip>
                                        <Text style={{ ...styles.columnRowStandard, fontSize: 12, width: "5.263157894736842%" }}>{item.giaTC / Price.PRICE}</Text>
                                        <Text style={{ ...styles.columnRowCeil, fontSize: 12, width: "5.263157894736842%" }}>{item.giaTran / Price.PRICE}</Text>
                                        <Text style={{ ...styles.columnRowFloor, fontSize: 12, width: "5.263157894736842%" }}>{item.giaSan / Price.PRICE}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua3) }}>{item.giaMua3 / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua3) }}>{Formatter(item.klMua3) || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua2) }}>{item.giaMua2 / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua2) }}>{Formatter(item.klMua2) || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua1) }}>{item.giaMua1 / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaMua1) }}>{Formatter(item.klMua1) || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}>{item.gia / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.gia) }}>{Formatter(item.kl) || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan1) }}>{item.giaBan1 / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan1) }}>{Formatter(item.klBan1) || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan2) }}>{item.giaBan2 / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan2) }}>{Formatter(item.klBan2) || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan3) }}>{item.giaBan3 / Price.PRICE || ''}</Text>
                                        <Text style={{ ...styles.columnRowTxtLandscape, color: ClassNameRender(item.giaTran, item.giaSan, item.giaTC, item.giaBan3) }}>{Formatter(item.klBan3) || ''}</Text>
                                        <Text style={styles.columnRowTxtLandscape}>{item.ktTong || '0'}</Text>
                                    </>
                                }


                            </View>

                        )
                    }}
                />
                : null}
        </View>

    )
}
export default LightningTableFavoredScreen
