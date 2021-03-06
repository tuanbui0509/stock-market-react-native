
import AxiosClient from '../../axios/axiosClient';

export const HistoryAdvanceMoney = (body) => {
    return AxiosClient.get(`LenhUng?${body}`)
}

export const HistoryOrder = (body) => {
    return AxiosClient.get(`LichSuLenhKhop?${body}`)
}

export const HistoryPurchased = (body) => {
    return AxiosClient.get(`LichSuLenhDat?${body}`)
}
export const PurchasedOneDay = () => {
    return AxiosClient.get("LenhDat/trongngay?current=1&pageSize=10000")
}
export const StatusStock = () => {
    return AxiosClient.get("TrangThai/lenhdat")
}

export const CancelStock = (id) => {
    return AxiosClient.put(`lenhdat/${id}`)
}

