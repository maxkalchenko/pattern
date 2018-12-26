import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { authReducer } from '../store/reducers/auth/reducer';

const rootReducer = combineReducers({
    authReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
