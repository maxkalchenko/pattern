import React from 'react';
import PropTypes from 'prop-types';

const ConfirmModal = ({ message, onResolve, onClose}) => (
    <>
        <div className='modal-body'>
            <div className='text-center'>
                <p>{message}</p>
            </div>
        </div>
        <div className='modal-footer'>
            <button type='button' onClick={onResolve} className='btn btn-dark'>Yes</button>
            <button type='button' onClick={onClose} className='btn btn-danger'>No</button>
        </div>
    </>
);

ConfirmModal.propTypes = {
    message: PropTypes.string,
    onResolve: PropTypes.func,
    onClose: PropTypes.func
};
  
ConfirmModal.defaultProps = {
    message: 'Are you sure?'
};
  
export default ConfirmModal;
