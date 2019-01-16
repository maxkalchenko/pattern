import { NOTIFICATION_OPEN, NOTIFICATION_CLOSE } from '../../actions/action-types';

const initialState = {
    messages: []
};

export const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case NOTIFICATION_OPEN:
            return {
                messages: state.messages.concat([action.payload])
            };
        case NOTIFICATION_CLOSE:
            return {
                messages: state.messages.filter(message => message.id !== action.payload)
            };
        default: 
            return state;
    }
};
