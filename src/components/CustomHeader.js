import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
function CustomHeader(props) {
    let { isHome, title, navigation, route } = props
   
    return (
        <View style={{ flexDirection: 'row', height: 50, paddingTop: 0, backgroundColor: '#37C2D0' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                {
                    isHome ?
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Icon
                                name="bars"
                                color='#fff'
                                size={30}
                                style={{ marginLeft: 10 }}
                            />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => navigation.replace('HomeApp')}
                        >
                            <Icon
                                name="chevron-left"
                                color='#fff'
                                size={20}
                                style={{ marginLeft: 10 }}
                            />
                            <Text style={{ color: '#fff', fontWeight: 'bold' }}>  Quay lại</Text>
                        </TouchableOpacity>
                }
            </View>

            <View style={{ flex: 2, justifyContent: 'center' }}>
                <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#fff' }}>{title}</Text>
            </View>
            <View style={{ flex: 1 }}></View>
        </View>
    )
}

export default CustomHeader
