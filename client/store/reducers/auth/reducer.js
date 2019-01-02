import { AUTH_SUCCESS, LOGOUT } from '../../actions/action-types';

import jwtDecode from 'jwt-decode';

const data = JSON.parse(localStorage.getItem('token'));

const initialState = {
    username: data ? (jwtDecode(data.token)).username : ''
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                username: action.payload
            };
        case LOGOUT:
            return {
                username: null
            };
        default: 
            return state;
    }
};
