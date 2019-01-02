import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeContextMenu, reOpenContextMenu  } from '../../store/reducers/contextmenu/actions';

import menus from './menu-types';

class ContextMenu extends Component {
    render() {
        let { isOpen, reOpen, type, data, x, y, closeContextMenu, reOpenContextMenu } = this.props;

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

        return (
            <>
                <div className='modal-backdrop show' 
                    style={{ opacity: 'inherit', backgroundColor: 'inherit' }} 
                    onContextMenu={reOpenContextMenu} 
                    onClick={closeContextMenu}>
                </div>
                <div className={y > window.innerHeight / 2 ? 'dropup' : 'dropdown'}
                    onContextMenu={event => event.preventDefault()} style={{ top: y, left: x, position: 'fixed', zIndex: 1050 }}>
                    <ul className='dropdown-menu' role='menu' style={{ display: 'block' }}>
                        {menus[type](data)}
                    </ul>
                </div>
            </>
        );
    }
}

const putStateToProps = state => state.contextMenuReducer;

const putActionsToProps = (dispatch) => {
    return {
        closeContextMenu: bindActionCreators(closeContextMenu, dispatch),
        reOpenContextMenu: bindActionCreators(reOpenContextMenu, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(ContextMenu);
