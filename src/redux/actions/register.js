import axios from "axios";
import { ERROR } from "../constants/base";
import { SIGNUP } from "../constants/register";


export const signup = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: 'http://localhost:8080',
            url: "register",
            data: data
        });

        if(res.status === 200 ){
            dispatch({
                type: SIGNUP,
                data: res.data
            })
        } else {
            dispatch({
                type: ERROR,
                data: null
            })
        }
    } catch (error) {
        console.log(error.response); // Kiểm tra phản hồi từ server
        dispatch({
            type: ERROR,
            data: null
        });
    }
};
