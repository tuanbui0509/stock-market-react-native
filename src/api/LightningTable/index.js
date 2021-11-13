
import AxiosClient from '../../axios/axiosClient';

export const LightningTable = () => {
    return AxiosClient.get("BangGiaTrucTuyen")
}
export const LightningTableFavored = () => {
    return AxiosClient.get("YeuThich")
}