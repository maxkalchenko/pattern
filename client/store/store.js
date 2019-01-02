import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from '../store/reducers/auth/reducer';
import { modalReducer } from '../store/reducers/modal/reducer';
import { contextMenuReducer } from '../store/reducers/contextmenu/reducer';
import { postsReducer } from '../store/reducers/posts/reducer';

const rootReducer = combineReducers({
    authReducer,
    modalReducer,
    contextMenuReducer,
    postsReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
