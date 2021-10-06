import axios from 'axios';
import config from './config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../store/Token';
const axiosClient = axios.create({
    baseURL: config.API_URL,
    headers: {
        // 'content-type': 'application/json',
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
    },
});
const requestHandler = async request => {
    const Token = await AsyncStorage.getItem('Token')
    console.log(Token);
    if (Token) {
        request.headers.Authorization = `Bearer ${Token}`;
    }
    return request;
};

const errorHandler = error => {
    return Promise.reject(error);
};

const responseHandler = async response => {
    const dispatch = useDispatch()
    const Token = useSelector(state => state.Token)
    if (response.status === 401) {
        await AsyncStorage.removeItem('Token')
        dispatch(removeToken())
    }

    return response;
};

axiosClient.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

axiosClient.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
);


export default axiosClient;