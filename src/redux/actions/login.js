import axios from "axios";
import { ERROR } from "../constants/base";
import { LOGIN } from "../constants/login";

export const login = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: 'http://localhost:8080',
            url: "login",
            data: data
        });

        if (res.status === 200) {
            console.log("Login response data:", res.data); // Kiểm tra dữ liệu trả về
            console.log("Role from response:", res.data.role); // Kiểm tra vai trò
            
            // Lưu token, username và userRole vào localStorage
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("username", res.data.username);

            
            localStorage.setItem('userRole', res.data.role); // Lưu vai trò vào localStorage

        

            // Dispatch thông tin người dùng vào Redux
            dispatch({
                type: LOGIN,
                data: {
                    ...res.data,
                    role: res.data.roles[0].name // Sử dụng 'roles' nếu cấu trúc phản hồi là mảng
                }
            });
            
            
            
        } else {
            dispatch({
                type: ERROR,
                data: null
            });
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null
        });
    }
    return null;
}
