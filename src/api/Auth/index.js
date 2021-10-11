
import AxiosClient from '../../axios/axiosClient';


export const register = (body) => {
    return AxiosClient.post("DangKy", body)
}
export const login = (body) => {
    return AxiosClient.post("DangNhap", JSON.stringify(body))
}

// export const createEmployee = (body) =>{
//     return AxiosClient.post("auth/createemployee" , body)
// }

// export const adminCreateEmployee = (body) =>{
//     return AxiosClient.post("auth/admincreateaccount" , body)
// }