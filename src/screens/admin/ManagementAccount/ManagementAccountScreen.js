import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../../core/RVText';
import CustomHeader from '../../../components/CustomHeader';

function ManagementAccountScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="User" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="Management AccountScreen page!"/>
            </View>
        </SafeAreaView>
    )
}

export default ManagementAccountScreen
