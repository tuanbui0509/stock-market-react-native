import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../../core/RVText';
import CustomHeader from '../../../components/CustomHeader';

function AccountScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="AccountScreen" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="AccountScreen!" />
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('AccountScreenDetail')}
                >
                    <RVText content="Go Account Screen Detail" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default AccountScreen
