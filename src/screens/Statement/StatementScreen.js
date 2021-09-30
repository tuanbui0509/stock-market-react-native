import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../core/RVText';
import CustomHeader from '../../components/CustomHeader';

function StatementScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="Statement" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="Statement!" />
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('StatementDetail')}
                >
                    <RVText content="Go Statement Detail" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default StatementScreen
