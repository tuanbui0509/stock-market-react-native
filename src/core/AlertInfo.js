import React from 'react'
import {
    View,
    Button,
    StyleSheet
} from 'react-native'

import {
    SCLAlert,
    SCLAlertButton
} from 'react-native-scl-alert'

import React from 'react'

function Logout() {
    const [state, setstate] = useState(false)
    const handleOpen = () => {
        setState(true)
    }

    const handleClose = () => {
        setState(false)
    }
    return (
        <View style={styles.container}>
            <Button title="Bạn có muốn đăng xuất không?" onPress={handleOpen} />
            <SCLAlert
                theme="info"
                show={state}
                title="Lorem"
                subtitle="Lorem ipsum dolor"
            >
                <SCLAlertButton theme="info" onPress={handleClose}>Done</SCLAlertButton>
            </SCLAlert>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})