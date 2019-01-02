import axios from 'axios';

export const defaults = token => {
    if (token) {
        localStorage.setItem('token', JSON.stringify({
            token: token.access_token,
            refreshToken: token.refresh_token,
            // username: token.username
        }));
    }

    let accessToken = JSON.parse(localStorage.getItem('token')) || {};

    if (accessToken.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken.token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
    
    // axios.defaults.headers.common['Accept'] =  'application/json, text/plain, */*';
    // axios.defaults.headers.common['Accept-Language'] = 'en-US,en;q=0.8';

    if (refreshToken) {
        refreshToken.finally(() => refreshToken = null);
    }
};

let refreshToken;

axios.interceptors.response.use(res => res, error => {
    if ((error.response || {}).status !== 401) {    
        return Promise.reject(error);
    }

    // TODO: remove
    let accessToken = JSON.parse(localStorage.getItem('token')) || {};
    if (!accessToken.token) {
        return Promise.reject(error);
    }

    if (!refreshToken) {
        const data = {
            grant_type: 'refresh_token',
            refresh_token: accessToken.refreshToken
        };

        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];

        refreshToken = axios({
            method: 'POST',
            url: '/api/token',
            data: data
        });
    }

    let config = error.config;
    
    return refreshToken.then(response => {
        if (!response || !response.data) {
            return;
        }

        defaults(response.data);

        return axios({
            ...config,
            headers: {
                'Authorization': 'Bearer ' + response.data.access_token
            }
        });
    }, () => {
        localStorage.removeItem('token');

        window.history.pushState({}, '', '/');
        window.location.reload();
    });
});
