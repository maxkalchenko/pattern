import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { close } from '../../store/reducers/notification/actions';

const Notification = ({ messages, close }) => (
    <div style={{ margin: '70px 0 0 1100px', position: 'fixed', zIndex: 9999, minWidth: '500px' }}>
        <strong>
            {messages.map(item => 
                <div className={item.type} key={item.id} role='alert'>
                    <a className='close' onClick={() => close(item.id)}>&times;</a>
                    {item.text}
                </div>)}
        </strong>
    </div>
);

Notification.propTypes = {
    items: PropTypes.array,
    close: PropTypes.func
};

const putStateToProps = state => state.notificationReducer;

const putActionsToProps = (dispatch) => {
    return {
        close: bindActionCreators(close, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Notification);
