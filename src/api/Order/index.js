
import AxiosClient from '../../axios/axiosClient';

export const Order = (body) => {
    return AxiosClient.post('lenhdat',body)
}
