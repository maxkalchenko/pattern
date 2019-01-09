
import { MODAL_OPEN, MODAL_CLOSE } from '../../actions/action-types';
import { LOGIN_MODAL, SHOPPING_CART_MODAL, CONFIRM_MODAL } from '../../../components/modals/modal-types';

export const openLoginModal = () => {
    return {
        type: MODAL_OPEN,
        payload: {
            type: LOGIN_MODAL
        }
    };
};

export const openShoppingCartModal = () => {
    return {
        type: MODAL_OPEN,
        payload: {
            type: SHOPPING_CART_MODAL
        }
    };
};

export const openConfirmModal = data => {
    return {
        type: MODAL_OPEN,
        payload: {
            type: CONFIRM_MODAL,
            data: data
        }
    };
};

export const closeModal = () => {
    return {
        type: MODAL_CLOSE
    };
};
