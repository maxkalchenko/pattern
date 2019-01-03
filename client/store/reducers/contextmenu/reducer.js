import { CONTEXT_MENU_OPEN, CONTEXT_MENU_CLOSE, CONTEXT_MENU_REOPEN } from '../../actions/action-types';

const initialState = {
    isOpen: false,
    reOpen: false,
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
        case CONTEXT_MENU_REOPEN:
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
