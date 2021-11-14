
import AxiosClient from '../../axios/axiosClient';

export const LightningTable = () => {
    return AxiosClient.get("BangGiaTrucTuyen")
}
export const LightningTableFavored = () => {
    return AxiosClient.get("YeuThich")
}

export const PostStockFavored = (body) => {
    return AxiosClient.post(`YeuThich`, body)
}

export const DeleteStockFavored = (body) => {
    return AxiosClient.delete(`YeuThich/${body}`)
}