import { MaterialCommunityIcons } from '@expo/vector-icons';
import _ from "lodash";
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Api from '../../../api/LightningTable';
import CustomHeader from '../../../components/CustomHeader';
import Color from '../../../constants/Colors';
function LightningTableScreen(props) {
    let { navigation } = props
    const [columns, setColumns] = useState(['MaCK', 'TC', 'Trần', 'Sàn', 'Tổng KL'])
    const [direction, setDirection] = useState(null)
    const [selectedColumn, setSelectedColumn] = useState(null)
    const [tableData, setTableData] = useState([])
    useEffect(() => {
        const fetchApi = async () => {
            const res = await Api.LightningTable()
            setTableData(res.data);

        }

        fetchApi()
    }, [])
    const sortTable = (column) => {
        const newDirection = direction === "desc" ? "asc" : "desc"
        const sortedData = _.orderBy(tableData, [column], [newDirection])
        setSelectedColumn(column)
        setDirection(newDirection)
        setTableData(sortedData)
    }
    const tableHeader = () => (
        <View style={styles.tableHeader}>
            {
                columns.map((column, index) => {
                    {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={styles.columnHeader}
                                onPress={() => sortTable(column)}>
                                <Text style={styles.columnHeaderTxt}>{column + " "}
                                    {selectedColumn === column && <MaterialCommunityIcons
                                        name={direction === "desc" ? "arrow-down-drop-circle" : "arrow-up-drop-circle"}
                                    />
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    }
                })
            }
        </View>
    )

    return (
        <View style={styles.container}>
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
                            <Text style={{ ...styles.columnRowTxt, fontWeight: "bold" }}>{item.macp.trim()}</Text>
                            <Text style={styles.columnRowStandard}>{item.giaTC}</Text>
                            <Text style={styles.columnRowCeil}>{item.giaTran}</Text>
                            <Text style={styles.columnRowFloor}>{item.giaSan}</Text>
                            <Text style={styles.columnRowTxt}>{item.ktTong || '0'}</Text>
                        </View>
                    )
                }}
            />
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#37C2D0",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50
    },
    tableRow: {
        flexDirection: "row",
        height: 40,
        alignItems: "center",
    },
    columnHeader: {
        width: "20%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
    },
    columnRowTxt: {
        width: "20%",
        textAlign: "center",
    },
    columnRowFloor: {
        width: "20%",
        textAlign: "center",
        color: Color.floor
    },
    columnRowCeil: {
        width: "20%",
        textAlign: "center",
        color: Color.ceil
    },
    columnRowStandard: {
        width: "20%",
        textAlign: "center",
        color: Color.standard
    }
});
export default LightningTableScreen
