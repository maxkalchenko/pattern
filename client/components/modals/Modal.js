import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../store/reducers/modal/actions';

import modals from '../../utils/modal-types';

const Modal = ({ isOpen, closeModal, type, data, child }) => {
    if (!isOpen) {
        return null;
    }

    if (data) {
        let { onResolve } = data;

        data.onResolve = async props => {
            try {
                const res = await (onResolve || (() => {}))(props);

                return closeModal(res);
            } catch (error) {
                return Promise.reject(error);
            }
        };
    }

    return (
        <>
            <div className='modal show' style={{ display: 'block' }}>
                <div className='modal-dialog modal-dialog-centered'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title'>{modals[type].title}</h4>
                            <button type='button' onClick={closeModal} className='close'>&times;</button>
                        </div>
                        {modals[type].modal({ ...data, onClose: closeModal.bind(this) })}
                    </div>
                </div>
            </div>
            <div className='modal-backdrop show'></div>
            {child && <Modal isOpen={true} closeModal={closeModal.bind(this)} type={child.type} data={child.data} child={child.child}/>}
        </>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    type: PropTypes.string,
    data: PropTypes.object,
    child: PropTypes.object
};

Modal.defaultProps = {
    isOpen: false
};

const putStateToProps = state => state.modalReducer;

const putActionsToProps = (dispatch) => {
    return {
        closeModal: bindActionCreators(closeModal, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Modal);
