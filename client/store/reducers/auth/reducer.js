import { AUTH_SUCCESS } from '../../actions/action-types';

let data = JSON.parse(localStorage.getItem('token')) || {};

const initialState = {
    username: data.username
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                username: action.payload
            };
        default: 
            return state;
    }
};
