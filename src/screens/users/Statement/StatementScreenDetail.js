import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import CustomHeader from '../../../components/CustomHeader';



function StatementScreenDetail(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Statement Detail" navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Statement Detail!</Text>
            </View>
        </SafeAreaView>
    )
}

export default StatementScreenDetail
