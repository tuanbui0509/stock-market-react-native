// CustomInput.js
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const CustomInput = (props) => {
    const {
        field: { name, onBlur, onChange, value },
        form: { errors, touched, setFieldTouched },
        ...inputProps
    } = props

    const onChangeText = (text) => {
        onChange(name)(text)
        props.onValueChange(text)

    }
    const hasError = errors[name] && touched[name]
    return (
        <>
            <TextInput
                style={[
                    styles.textInput,
                    hasError && styles.errorInput
                ]}
                value={value}
                onChangeText={onChangeText}
                onBlur={() => {
                    setFieldTouched(name)
                    onBlur(name)
                }}
                {...inputProps}
            />
            {hasError && <Text style={styles.errorMsg}>{errors[name]}</Text>}
        </>
    )
}

const styles = StyleSheet.create({
    textInput: {
        height: 40,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        // borderColor: 'gray',
        // borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 10,

        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        padding: 10,
        color: '#05375a',

    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },
    errorInput: {
        borderColor: 'red',
    },
    // textInput: {
    //     flex: 1,
    //     marginTop: Platform.OS === 'ios' ? 0 : -12,
    //     paddingLeft: 10,
    //     color: '#05375a',
    // },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        textAlign: 'center'
    },
})

export default CustomInput