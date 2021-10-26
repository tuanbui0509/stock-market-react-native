// CustomInput.js
import React from 'react';
import { StyleSheet, Text, TextInput } from 'react-native';

const CustomInputOrder = (props) => {
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
                maxLength={9}
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
export default CustomInputOrder

const styles = StyleSheet.create({
    textInput: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 40,
        width: '100%',
        marginLeft: 0,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 5,
        fontSize: 16
    },
    errorText: {
        fontSize: 10,
        color: 'red',
    },
    errorInput: {
        borderColor: 'red',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 11,
        textAlign: 'center'
    },
})
