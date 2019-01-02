
import { MODAL_OPEN, MODAL_CLOSE } from '../../actions/action-types';
import { LOGIN_MODAL, SHOPPING_CART_MODAL } from '../../../components/modals/modal-types';

export const openLoginModal = () => {
    return {
        type: MODAL_OPEN,
        payload: LOGIN_MODAL
    };
};

export const openShoppingCartModal = () => {
    return {
        type: MODAL_OPEN,
        payload: SHOPPING_CART_MODAL
    };
};

export const closeModal = () => {
    return {
        type: MODAL_CLOSE
    };
};
