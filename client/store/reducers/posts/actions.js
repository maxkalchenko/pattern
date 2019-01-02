import axios from 'axios';

import { GET_POSTS, ADD_POST } from '../../actions/action-types';

export const add = params => {
    const data = { ...params };

    return dispatch => {
        return axios({
            method: 'POST',
            url: '/api/posts',
            data: data
        }).then(() => {
            dispatch({
                type: ADD_POST,
                payload: { ...params }
            });
        });
    };
};

export const get = user => {
    return dispatch => {
        axios({
            method: 'GET',
            url: '/api/posts',
            data: user
        }).then(res => {
            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        });
    };
};
