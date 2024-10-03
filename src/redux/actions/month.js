import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_ALL_MONTH } from "../constants/month";

export const getAllMonth = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: 'months',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        });
        if (res.status === 200) {
            dispatch({
                type: GET_ALL_MONTH,
                data: res.data
            });
        } else {
            // Xử lý trường hợp không phải 200
            dispatch({
                type: ERROR,
                data: 'Đã xảy ra lỗi khi lấy dữ liệu tháng. Vui lòng thử lại.',
            });
        }
    } catch (error) {
        // Ghi lại lỗi trong console để tiện theo dõi
        console.error("Error fetching months:", error);
        
        // Cung cấp thông tin lỗi cho Redux state
        dispatch({
            type: ERROR,
            data: error.response?.data?.message || 'Đã xảy ra lỗi không xác định.',
        });
    }
}
