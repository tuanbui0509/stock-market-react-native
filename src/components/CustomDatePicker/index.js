import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CustomDatePicker = (props) => {
    const {
        field: { name, onChange, value },
        form: { errors, touched },
        ...inputProps
    } = props
    const hasError = errors[name] && touched[name]
    const [date, setDate] = useState(moment());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);


    const onChangeDate = (e, selectedDate) => {
        setShow(false)
        setDate(moment(selectedDate))
        props.onDateChange(selectedDate)
    }

    const renderDatePicker = () => {
        return (
            <DateTimePicker
                timeZoneOffsetInMinutes={0}
                value={new Date(date)}
                mode={mode}
                name={name}
                minimumDate={new Date(moment().subtract(120, 'years').format('DD/MM/YYYY'))}
                maximumDate={new Date(moment().format('DD/MM/YYYY'))}
                onChange={onChangeDate}
                {...inputProps}
            />
        )
    }
    return (
        <View>
            <TouchableOpacity
                activeOpacity={0}
                onPress={() => setShow(true)}
            >
                <Text style={styles.textStyle}>{date.format('DD/MM/YYYY')}</Text>
                {/* /{value.format('DD/MM/YYYY')} */}
                {Platform.OS !== 'ios' && show && renderDatePicker()}
            </TouchableOpacity>
            {hasError && <Text style={styles.errorMsg}>{errors[name]}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    textStyle: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 0,
        height: 40,
        width: '100%',
        marginBottom: 10,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        // borderColor: 'gray',
        // borderWidth: StyleSheet.hairlineWidth,
        // borderRadius: 10,
    }
})

export default CustomDatePicker
