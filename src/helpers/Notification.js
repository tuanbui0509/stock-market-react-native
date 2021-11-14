import { showMessage } from 'react-native-flash-message';

export const DangerNotification = (message) => {
    showMessage({
        message: 'Thất bại',
        description: message,
        type: "danger",
    });
}

export const SuccessNotification = (message) => {
    showMessage({
        message: 'Thành công',
        description: message,
        type: "success",
    });
}