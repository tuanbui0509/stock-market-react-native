import React from 'react';
import { SafeAreaView, TouchableOpacity, View } from 'react-native';
import RVText from '../core/RVText';
import CustomHeader from '../CustomHeader';
function HomeScreen(props) {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <CustomHeader title="Home" isHome={true} navigation={props.navigation} />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <RVText content="Home!" />
                <TouchableOpacity
                    style={{ marginTop: 20 }}
                    onPress={() => props.navigation.navigate('HomeDetail')}
                >
                    <RVText content="Go Home Detail!" />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreen
