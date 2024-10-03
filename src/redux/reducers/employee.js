import { ERROR } from "../constants/base";
import { DELETE, GET_ALL, GET_ONE, POST, UPDATE } from "../constants/employee";

const initialState = {
    data: [],
};

const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_EMPLOYEES':
            return {
                ...state,
                data: action.payload,
            };
        default:
            return state;
    }
};


export default employeeReducer;
