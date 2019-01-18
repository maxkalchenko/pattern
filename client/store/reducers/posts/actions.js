import axios from 'axios';
import { t as translate } from 'i18next';

import { GET_POSTS, CREATE_POST, DELETE_POST, UPDATE_POST } from '../../actions/action-types';
import { info, success } from '../notification/actions';

export const add = data => {
    return dispatch => {
        return axios({
            method: 'POST',
            url: '/api/posts',
            data: data
        }).then(result => {
            dispatch(success(translate('CRUD.CREATE', { item: 'Post', artikel: 'Post' })));

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
            dispatch(success(translate('CRUD.DELETE', { item: 'Post', artikel: 'Post' })));

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
            dispatch(success(translate('CRUD.UPDATE', { item: 'Post', artikel: 'Post' })));

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
            dispatch(info(translate('CRUD.READ', { item: 'Post', artikel: 'Post' })));

            dispatch({
                type: GET_POSTS,
                payload: res.data
            });
        });
    };
};
