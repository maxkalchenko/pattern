import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { defaults } from '../../../utils/axios';
import { AUTH_SUCCESS, LOGOUT } from '../../actions/action-types';

export const auth = params => {
    const data = {
        grant_type: 'password',
        ...params
    };

    return dispatch => {
        return axios({
            method: 'POST',
            url: '/api/token',
            data: data
        }).then(response => {
            const { username } = jwtDecode(response.data.access_token);

            defaults(response.data);

            dispatch({
                type: AUTH_SUCCESS,
                payload: username
            });
        });
    };
};

export const signup = user => {
    return dispatch => {
        return axios({
            method: 'POST',
            url: '/api/users',
            data: user
        }).then(() => {
            return auth({
                identifier: user.username,
                password: user.password
            })(dispatch);
        });
    };
};

export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: LOGOUT
    };
};