import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../store/reducers/modal/actions';

import modals from './modal-types';

class Modal extends Component {
    render() {
        let { isOpen, closeModal, type } = this.props;

        if (!isOpen) {
            return null;
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
                            {modals[type].modal}
                        </div>
                    </div>
                </div>
                <div className='modal-backdrop show'></div>
                {/* <Modal/> */}
            </>
        );
    }
}

const putStateToProps = state => state.modalReducer;

const putActionsToProps = (dispatch) => {
    return {
        closeModal: bindActionCreators(closeModal, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Modal);
