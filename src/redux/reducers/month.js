import { ERROR } from "../constants/base";
import { GET_ALL_MONTH } from "../constants/month";

const initState = {
    data: [],
    month: {},
    error: null, // Đặt là null để lưu thông tin chi tiết về lỗi
    success: true,
};

const monthReducers = (state = initState, action) => {
    switch (action.type) {
        case GET_ALL_MONTH:
            return {
                ...state,
                data: action.data,
                success: true,
                error: null, // Reset lỗi khi dữ liệu được lấy thành công
            };

        case ERROR:
            return {
                ...state,
                error: action.data || 'Đã xảy ra lỗi không xác định', // Cung cấp thông điệp lỗi cụ thể
                success: false, // Đánh dấu là không thành công
            };

        default:
            return state;
    }
};

export default monthReducers;
