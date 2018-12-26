import axios from 'axios';
// import { defaults } from '../../../utils/axios';
// import { AUTH_SUCCESS } from '../../actions/action-types';
// import CONFIG from '../../../config';

// export const auth = (username, password) => {
//     const data = {
//         grant_type: 'password',
//         client_id: 'ngAuthApp',
//         userName: username,
//         password: password
//     };

//     let body = [];

//     Object.keys(data).forEach(key => {
//         body.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
//     });

//     return dispatch => {
//         axios({
//             method: 'POST',
//             url: CONFIG.API_URL + 'token',
//             data: body.join('&'),
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             }
//         }).then(response => {
//             defaults(response.data);

//             dispatch({
//                 type: AUTH_SUCCESS,
//                 payload: response.data.userName
//             });
//         });
//     };
// };

export const signup = user => {
    return dispatch => {
        axios({
            method: 'POST',
            url: '/api/users',
            data: user
        }).then(() => {
            debugger;
            // auth(user.userName, user.password)(dispatch);
        });
    };
};
