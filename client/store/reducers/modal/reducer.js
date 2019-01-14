import { MODAL_OPEN, MODAL_CLOSE } from '../../actions/action-types';

const initialState = {
    isOpen: false,
    type: undefined,
    data: undefined,
    child: null
};

export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_OPEN:
            const newState = {
                ...action.payload,
                isOpen: true
            };

            if (state.isOpen) {
                let child = getLast(state);
                
                child.child = newState;

                return {
                    ...state,
                    child: { ...state.child }
                };
            }

            return newState;
        case MODAL_CLOSE:
            if (state.child) {
                removeLast(state);

                return {
                    ...state,
                    child: state.child ? { ...state.child } : null
                };
            }

            return {
                isOpen: false
            };
        default: 
            return state;
    }
};

const getLast = state => {
    while (state.child) {
        state = state.child;
    }

    return state;
}

const removeLast = state => {
    do {
        if (!state.child.child) {
            delete state.child;
        } else {
            state = state.child;
        }
    } while (state.child)
}
