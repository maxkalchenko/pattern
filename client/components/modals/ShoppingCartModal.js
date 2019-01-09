import React from 'react';
import PropTypes from 'prop-types';

const ShoppingCartModal = ({ onClose, message }) => (
    <>
        <div className='modal-body'>
            <div className='text-center'>
                <i className='fa fa-shopping-cart nav-link'></i>
                <p>{message}</p>
            </div>
        </div>
        <div className='modal-footer'>
            {/* <button type='button' onClick={() => {}} className='btn btn-dark'>Buy</button> */}
            <button type='button' onClick={onClose} className='btn btn-danger'>Close</button>
        </div>
    </>
);

ShoppingCartModal.propTypes = {
    message: PropTypes.string,
    onClose: PropTypes.func
};
  
ShoppingCartModal.defaultProps = {
    message: 'YOUR CART IS EMPTY'
};
  
export default ShoppingCartModal;
