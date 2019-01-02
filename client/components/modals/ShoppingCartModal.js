import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../store/reducers/modal/actions';

class ShoppingCartModal extends Component {
    render() {
        return (
            <>
                <div className='modal-body'>
                    <div className='text-center'>
                        <i className='fa fa-shopping-cart nav-link'></i>
                        <p>YOUR CART IS EMPTY</p>
                    </div>
                </div>
                <div className='modal-footer'>
                    {/* <button type='button' onClick={() => {}} className='btn btn-dark'>Buy</button> */}
                    <button type='button' onClick={this.props.closeModal} className='btn btn-danger'>Close</button>
                </div>
            </>
        );
    }
}

const putStateToProps = state => state;

const putActionsToProps = (dispatch) => {
    return {
        closeModal: bindActionCreators(closeModal, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(ShoppingCartModal);
