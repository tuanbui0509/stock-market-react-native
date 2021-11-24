import React from 'react';
import { StyleSheet } from "react-native";
import Color from '../constants/Colors';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerRBSheet: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    tableHeader: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#37C2D0",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 50
    },
    tableHeaderDetail: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: "#37C2D0",
        borderTopEndRadius: 10,
        borderTopStartRadius: 10,
        height: 40
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
    columnHeaderDetail: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center"
    },
    columnHeaderTxt: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16
    },
    columnRowTxt: {
        width: "20%",
        textAlign: "center",
        fontSize: 14,
        color: '#000',
    },
    columnRowTxtLight: {
        textAlign: "center",
        fontSize: 15,
    },
    columnRowTxt4: {
        width: "25%",
        textAlign: "center",
        fontSize: 16,
    },
    columnRowTxtLandscape: {
        width: "5.263157894736842%",
        textAlign: "center",
        fontSize: 12,
        fontWeight: "bold",
        color: '#000'

    },
    columnRowTxt3: {
        width: "33.33337%",
        textAlign: "center",
        fontSize: 16,

    },
    columnRowFloor: {
        width: "20%",
        textAlign: "center",
        color: Color.floor,
        fontWeight: "bold",
        fontSize: 16
    },
    columnRowCeil: {
        width: "20%",
        textAlign: "center",
        color: Color.ceil,
        fontWeight: "bold",
        fontSize: 16
    },
    columnRowStandard: {
        width: "20%",
        textAlign: "center",
        fontWeight: "bold",
        color: Color.standard,
        fontSize: 16

    },
    textTitleRBSheet: {
        fontSize: 20,
        padding: 2,
        fontWeight: 'bold',
        textAlign: "center",
    },
    textBodyRBSheet: {
        width: "16.66666666666667%",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    textBodyRBSheet_main: {
        width: "30%",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold"
    },
    textTitle: {
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: 'red'
    }
});

export default styles;