
import AxiosClient from '../../axios/axiosClient';

export const Order = (body) => {
    return AxiosClient.post('lenhdat',body)
}

export const CheckOrder = (body) => {
    return AxiosClient.post('LenhDat/check',body)
}
