import React from 'react';

import LoginModal from './LoginModal';
import ShoppingCartModal from './ShoppingCartModal';
import ConfirmModal from './ConfirmModal';

export const LOGIN_MODAL = 'LOGIN_MODAL';
export const SHOPPING_CART_MODAL = 'SHOPPING_CART_MODAL';
export const CONFIRM_MODAL = 'CONFIRM_MODAL';

export default {
    LOGIN_MODAL: {
        title: 'Login',
        modal: props => <LoginModal onClose={props.onClose}/>
    },
    SHOPPING_CART_MODAL: {
        title: 'Shopping',
        modal: props => <ShoppingCartModal onClose={props.onClose}/>
    },
    CONFIRM_MODAL: {
        title: 'Please confirm!',
        modal: props => <ConfirmModal message={props.message} onResolve={props.onResolve} onClose={props.onClose}/>
    }
};
