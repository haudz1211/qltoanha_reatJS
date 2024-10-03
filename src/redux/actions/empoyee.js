import axios from "axios";
import { ERROR } from "../constants/base";
import { DELETE, GET_ALL, POST, UPDATE } from "../constants/employee";
// import { GET_ONE } from "../constants/employee";

export const getAllEmployeeBy = (companyId) => async (dispatch) => {
    try {
        const response = await axios.get(`/api/company-employee/company/${companyId}`);

        dispatch({ type: 'FETCH_EMPLOYEES_SUCCESS', payload: response.data });
    } catch (error) {
        console.error("Error fetching employees:", error);
        dispatch({ type: 'FETCH_EMPLOYEES_FAILURE', payload: error.message });
    }
};




export const createEmployee = (data, companyId) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company-employee/companyId=${companyId}`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status === 200){
            dispatch({
                type: POST,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const updateEmployee = (id, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company-employee/${id}`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status === 200){
            dispatch({
                type: UPDATE,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const deleteEmployee = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company-employee/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status === 200){
            dispatch({
                type: DELETE,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}