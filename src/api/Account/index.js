
import AxiosClient from '../../axios/axiosClient';

export const MyStocks = () => {
    return AxiosClient.get("ChungKhoanHienCo?current=1&pageSize=10000")
}
export const MyBankAccount = () => {
    return AxiosClient.get("TaiKhoanNganHang")
}
