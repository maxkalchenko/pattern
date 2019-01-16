import axios from 'axios';

import { GET_POSTS, CREATE_POST, DELETE_POST, UPDATE_POST } from '../../actions/action-types';
import { info, success } from '../notification/actions';

export const add = data => {
    return dispatch => {
        return axios({
            method: 'POST',
            url: '/api/posts',
            data: data
        }).then(result => {
            dispatch(success('Post was added successfully!'));

            dispatch({
                type: CREATE_POST,
                payload: result.data
            });
        });
    };
};

export const remove = data => {
    return dispatch => {
        return axios({
            method: 'DELETE',
            url: '/api/posts',
            data: data
        }).then(() => {
            dispatch(success('Post was removed successfully!'));

            dispatch({
                type: DELETE_POST,
                payload: data
            });
        });
    };
};

export const update = data => {
    return dispatch => {
        return axios({
            method: 'PUT',
            url: '/api/posts',
            data: data
        }).then(() => {
            dispatch(success('Post was updated successfully!'));

            dispatch({
                type: UPDATE_POST,
                payload: data
            });
        });
    };
};

export const get = user => {
    return dispatch => {
        return axios({
            method: 'GET',
            url: '/api/posts',
            data: user
        }).then(res => {
            dispatch(info('Posts were loaded!'));

            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        });
    };
};
