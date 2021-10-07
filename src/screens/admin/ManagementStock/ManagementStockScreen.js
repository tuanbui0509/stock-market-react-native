import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../../core/RVText';
import CustomHeader from '../../../components/CustomHeader';

function ManagementStockScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="ManagementStock" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="ManagementStocksScreen!"/>
            </View>
        </SafeAreaView>
    )
}

export default ManagementStockScreen
