import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../../core/RVText';
import CustomHeader from '../../../components/CustomHeader';

function LightningTableScreen(props) {
    let { navigation } = props
    console.log('====================================');
    console.log(navigation);
    console.log('====================================');
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Bảng diện thị trường" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="LightningTable!" />
            </View>
        </SafeAreaView>
    )
}

export default LightningTableScreen
