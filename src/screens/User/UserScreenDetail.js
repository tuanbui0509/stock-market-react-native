import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import CustomHeader from '../../components/CustomHeader';


function HomeScreenDetail(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Home Detail" navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home Detail!</Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreenDetail
