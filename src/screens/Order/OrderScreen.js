import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../core/RVText';
import CustomHeader from '../../components/CustomHeader';

function OrderScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="Setting" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="Setting!" />
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('SettingDetail')}
                >
                    <RVText content="Go Setting Detail" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default OrderScreen
