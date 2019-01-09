import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeContextMenu, reOpenContextMenu  } from '../../store/reducers/contextmenu/actions';

class ContextMenu extends Component {
    render() {
        let { isOpen, reOpen, data, x, y, closeContextMenu, reOpenContextMenu } = this.props;

        if (reOpen) {
            setTimeout(() => {
                let targetEvent = new MouseEvent('contextmenu', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
    
                targetEvent.forceX = x;
                targetEvent.forceY = y;
    
                let contextTarget = document.elementFromPoint(x, y);
    
                contextTarget.dispatchEvent(targetEvent);
            }, 0);
        }

        if (!isOpen || reOpen) {
            return null;
        }

         // TODO: handle this differently
        if ((data || []).filter(item => item.check).length === 0) {
            setTimeout(closeContextMenu, 0);

            return null;
        }

        return (
            <>
                <div className='modal-backdrop show' 
                    style={{ opacity: 'inherit', backgroundColor: 'inherit' }} 
                    onContextMenu={reOpenContextMenu} 
                    onClick={closeContextMenu}>
                </div>
                <div className={y > window.innerHeight / 2 ? 'dropup' : 'dropdown'} onClick={closeContextMenu}
                    onContextMenu={event => event.preventDefault()} style={{ top: y, left: x, position: 'fixed', zIndex: 1050 }}>
                    <ul className='dropdown-menu' role='menu' style={{ display: 'block' }}>
                        {data.filter(item => item.check)
                            .map((item, index) => 
                                <li style={{ width: '100%'}} onClick={item.action} key={index}>
                                    <a style={{ display: 'block', padding: '3px 20px', color: '#333' }} href='javascript:void(0)'>
                                        {item.icon && <i className={'fa ' + item.icon}></i>} {item.label}
                                    </a>
                                </li>
                            )}
                    </ul>
                </div>
            </>
        );
    }
}

ContextMenu.propTypes = {
    isOpen: PropTypes.bool,
    reOpen: PropTypes.bool,
    closeContextMenu: PropTypes.func,
    reOpenContextMenu: PropTypes.func,
    data: PropTypes.array,
    x: PropTypes.number,
    y: PropTypes.number
};
  
ContextMenu.defaultProps = {
    isOpen: false,
    reOpen: false
};

const putStateToProps = state => state.contextMenuReducer;

const putActionsToProps = (dispatch) => {
    return {
        closeContextMenu: bindActionCreators(closeContextMenu, dispatch),
        reOpenContextMenu: bindActionCreators(reOpenContextMenu, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(ContextMenu);
