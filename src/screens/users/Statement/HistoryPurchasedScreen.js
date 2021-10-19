import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../../core/RVText';

import CustomHeader from '../../../components/CustomHeader';

function HistoryPurchasedScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="HistoryPurchasedScreen!" />
            </View>
        </SafeAreaView>
    )
}

export default HistoryPurchasedScreen
