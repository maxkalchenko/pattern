import { CONTEXT_MENU_OPEN, CONTEXT_MENU_CLOSE, CONTEXT_MENU_CLOSE_AND_OPEN } from '../../actions/action-types';

const initialState = {
    isOpen: false,
    reOpen: false,
    type: undefined,
    data: undefined,
    x: undefined,
    y: undefined
};

export const contextMenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTEXT_MENU_OPEN:
            return {
                ...action.payload,
                reOpen: false,
                isOpen: true
            };
        case CONTEXT_MENU_CLOSE_AND_OPEN:
            return {
                ...state,
                ...action.payload,
                reOpen: true,
                isOpen: true
            };
        case CONTEXT_MENU_CLOSE:
            return {
                reOpen: false,
                isOpen: false
            };
        default: 
            return state;
    }
};
