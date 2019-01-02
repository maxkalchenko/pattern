import React from 'react';

import LoginModal from './LoginModal';
import ShoppingCartModal from './ShoppingCartModal';

export const LOGIN_MODAL = 'LOGIN_MODAL';
export const SHOPPING_CART_MODAL = 'SHOPPING_CART_MODAL';

export default {
    LOGIN_MODAL: {
        title: 'Login',
        modal: <LoginModal/>
    },
    SHOPPING_CART_MODAL: {
        title: 'Shopping',
        modal: <ShoppingCartModal/>
    }
};
