
import { NOTIFICATION_OPEN, NOTIFICATION_CLOSE } from '../../actions/action-types';

const TIME = 7000;

let timeouts = {};

const open = (type, text) => {
    return dispatch => {
        let id = Date.now();

        timeouts[id] = setTimeout(() => dispatch(close(id)), TIME);

        dispatch({
            type: NOTIFICATION_OPEN,
            payload: {
                text: text,
                type: type,
                id: id
            }
        });
    }
};

export const success = open.bind(this, 'alert alert-success');

export const info = open.bind(this, 'alert alert-info');

export const warning = open.bind(this, 'alert alert-warning');

export const error = text => open('alert alert-danger', text || 'An error has occurred!');

export const close = id => {
    clearTimeout(timeouts[id]);
    delete timeouts[id];

    return {
        type: NOTIFICATION_CLOSE,
        payload: id
    };
};
