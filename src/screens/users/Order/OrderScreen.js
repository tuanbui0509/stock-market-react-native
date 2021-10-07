import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../../core/RVText';

import CustomHeader from '../../../components/CustomHeader';

function OrderScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Order" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="Order!" />
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('OrderDetail')}
                >
                    <RVText content="Go OrderScreenDetail" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OrderScreen
