
import AxiosClient from '../../axios/axiosClient';
// register form
export const ListRegisterForm = (body) => {
    return AxiosClient.get(`DonDangKy?${body}`)
}

export const ConfirmRegisterForm = (id) => {
    return AxiosClient.put(`DonDangKy/${id}`)
}

export const DeleteRegisterForm = (id) => {
    return AxiosClient.delete(`DonDangKy/${id}`)
}
// users

export const ListUser = () => {
    return AxiosClient.get(`NhaDauTu?current=1&pageSize=10000`)
}

// stocks
export const ListStock = () => {
    return AxiosClient.get(`CoPhieu?current=1&pageSize=10000`)
}
