import React from 'react';

import LoginModal from '../components/modals/LoginModal';
import ShoppingCartModal from '../components/modals/ShoppingCartModal';
import ConfirmModal from '../components/modals/ConfirmModal';

export const LOGIN_MODAL = 'LOGIN_MODAL';
export const SHOPPING_CART_MODAL = 'SHOPPING_CART_MODAL';
export const CONFIRM_MODAL = 'CONFIRM_MODAL';

export default {
    LOGIN_MODAL: {
        title: 'Login',
        modal: props => <LoginModal {...props}/>
    },
    SHOPPING_CART_MODAL: {
        title: 'Shopping',
        modal: props => <ShoppingCartModal {...props}/>
    },
    CONFIRM_MODAL: {
        title: 'Please confirm!',
        modal: props => <ConfirmModal {...props}/>
    }
};
