import React, { useState } from 'react';
import { View } from 'react-native';
import { Overlay } from 'react-native-elements';
import { DotsLoader, TextLoader } from 'react-native-indicator';

const ComponentLoading = () =>
    <View>
        <DotsLoader />
        <TextLoader text="Đang xử lý" />
    </View>
function Loading({ loading }) {
    return (
        <View>
            <Overlay
                isVisible={loading}
            // onBackdropPress={() => setLoading(false)}
            >
                <ComponentLoading />
            </Overlay>
        </View>
    )
}

export default Loading
