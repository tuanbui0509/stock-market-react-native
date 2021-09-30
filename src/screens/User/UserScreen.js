import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../../core/RVText';
import CustomHeader from '../../components/CustomHeader';

function UserScreen(props) {
    let { navigation } = props
    return (
        <SafeAreaView style={{ flex: 1}}>
            <CustomHeader title="User" isHome={true} navigation={navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="User!" />
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => navigation.navigate('UserDetail')}
                >
                    <RVText content="Go User Detail" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default UserScreen
