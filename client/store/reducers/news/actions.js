import axios from 'axios';

import { GET_NEWS } from '../../actions/action-types';

export const get = () => {
    return dispatch => {
        return axios({
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/photos'
        })
        .then(result => {
            let { data }  = result;
            data.splice(100);

            return axios({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts'
            }).then(result => {
                dispatch({
                    type: GET_NEWS,
                    payload: data.reduce((accumulator, currentValue, index) => {
                        accumulator[index].title = toTitleCase(accumulator[index].title);
                        accumulator[index].body = toTitleCase(accumulator[index].body);
                        accumulator[index].url = currentValue.url;

                        return accumulator;
                    }, result.data)
                });

                function toTitleCase(string) {
                    return string.charAt(0).toUpperCase() + string.slice(1);
                }
            });
        });
    };
};
