import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader';


function OrderScreenDetail(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Setting Detail" navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Setting Detail!</Text>
            </View>
        </SafeAreaView>
    )
}

export default OrderScreenDetail
