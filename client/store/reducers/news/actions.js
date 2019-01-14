import axios from 'axios';

import { GET_NEWS } from '../../actions/action-types';

export const get = () => {
    return async dispatch => {
        try {
            const photos = await axios({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/photos'
            })
            
            const posts = await axios({
                method: 'GET',
                url: 'https://jsonplaceholder.typicode.com/posts'
            })
            
            let { data }  = photos;
            data.splice(100);
            
            dispatch({
                type: GET_NEWS,
                payload: data.reduce((accumulator, currentValue, index) => {
                    accumulator[index].title = toTitleCase(accumulator[index].title);
                    accumulator[index].body = toTitleCase(accumulator[index].body);
                    accumulator[index].url = currentValue.url;

                    return accumulator;
                }, posts.data)
            });
        } catch (error) {
            return Promise.reject(error);
        }

        function toTitleCase(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }                
    };
};
