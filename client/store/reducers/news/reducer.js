import { GET_NEWS } from '../../actions/action-types';

const initialState = {
    news: []
};

export const newsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NEWS:
            return {
                news: action.payload
            };
        default:
            return state;
    }
};
