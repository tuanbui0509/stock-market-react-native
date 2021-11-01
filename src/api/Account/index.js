
import AxiosClient from '../../axios/axiosClient';

export const MyStocks = () => {
    return AxiosClient.get("ChungKhoanHienCo?current=1&pageSize=10000")
}
export const MyBankAccount = () => {
    return AxiosClient.get("TaiKhoanNganHang")
}

export const ChangePassword = (body) => {
    return AxiosClient.put("MatKhau/DangNhap", body)
}

export const ChangePin = (body) => {
    return AxiosClient.put("MatKhau/DatLenh", body)
}
export const KhaDung = (body) => {
    return AxiosClient.get(`lenhung/${body.currentBank}/khadung?date=${body.date}`)
}
export const PhiUng = (body) => {
    return AxiosClient.get(`LenhUng/PhiUng/${body}`)
}

export const LenhUng = (body) => {
    return AxiosClient.post('LenhUng', body)
}