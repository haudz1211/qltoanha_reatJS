import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_ALL_MONTHLY_STAT_OF_COMPANIES } from "../constants/monthly_statistics";
export const getAllMonthlyStatsOfCompanies = (month) => async dispatch => {
    try {
        console.log('Fetching data for month:', month); // Kiểm tra month trước khi gọi API
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company/monthly_total_fee?monthId=${month.id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        console.log('API Response:', res); // Kiểm tra dữ liệu trả về từ API
        if(res.status === 200){
            dispatch({
                type: GET_ALL_MONTHLY_STAT_OF_COMPANIES,
                data: res.data
            });
        } else {
            console.log('Non-200 status code:', res.status); // Kiểm tra status code không phải 200
            dispatch({
                type: ERROR,
                data: null,
            });
        }
    } catch (error) {
        console.error('Error fetching monthly stats:', error); // Hiển thị lỗi nếu có
        dispatch({
            type: ERROR,
            data: null,
        });
    }
}

