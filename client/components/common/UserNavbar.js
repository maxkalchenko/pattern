import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openLoginModal, openShoppingCartModal } from '../../store/reducers/modal/actions';
import { logout } from '../../store/reducers/auth/actions';

const UserNavbar = ({ username, openLoginModal, logout, openShoppingCartModal }) => (
    <ul className='navbar-nav'>
        <li className='nav-item'>
            {username ?
                <div className='nav-link'>
                    <i className='fa fa-user-circle'></i>
                    <span>{` ${username}`}</span>
                </div> :
                <span onClick={openLoginModal} className='nav-link'>LOGIN</span>}
        </li>
        <li className='nav-item'>
            {username ?
                <span onClick={logout} className='nav-link'>LOGOUT</span> :
                <Link to='/signup' className='nav-link'>SIGN UP</Link>}
        </li>
        <li className='nav-item'>
            <i className='fa fa-shopping-cart nav-link' onClick={openShoppingCartModal}>
                <span className='badge badge-pill badge-light'>0</span>
            </i>
        </li>
    </ul>
);

UserNavbar.propTypes = {
    username: PropTypes.string,
    openLoginModal: PropTypes.func,
    openShoppingCartModal: PropTypes.func,
    logout: PropTypes.func
};

const putStateToProps = state => state.authReducer;

const putActionsToProps = (dispatch) => {
    return {
        openLoginModal: bindActionCreators(openLoginModal, dispatch),
        openShoppingCartModal: bindActionCreators(openShoppingCartModal, dispatch),
        logout: bindActionCreators(logout, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(UserNavbar);