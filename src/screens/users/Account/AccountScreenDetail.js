import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';


function AccountScreenDetail(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="AccountScreenDetail" navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>AccountScreenDetail Detail!</Text>
            </View>
        </SafeAreaView>
    )
}

export default AccountScreenDetail
