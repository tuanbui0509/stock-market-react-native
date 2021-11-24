import React from 'react';
import { StyleSheet } from "react-native";
import Colors from '../constants/Colors';
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    modalView: {
        margin: 10,
        backgroundColor: "white",
        borderRadius: 6,
        padding: 5,
        alignItems: "center",
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default styles;
