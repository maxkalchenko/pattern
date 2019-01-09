import { MODAL_OPEN, MODAL_CLOSE } from '../../actions/action-types';

const initialState = {
    isOpen: false,
    type: undefined,
    data: undefined
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            return {
                ...action.payload,
                isOpen: true
            };
        case MODAL_CLOSE:
            return {
                isOpen: false
            };
        default: 
            return state;
    }
};
