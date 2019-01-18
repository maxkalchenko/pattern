import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { openContextMenu } from '../../store/reducers/contextmenu/actions';

import i18n from '../../i18n/i18n';

class Language extends Component {
    open(event) {
        this.props.openContextMenu(event, [{
            action: () => i18n.changeLanguage('en'),
            label: 'English',
            icon: 'fa-language',
            check: true
        }, {
            action: () => i18n.changeLanguage('de'),
            label: 'Deutsch',
            icon: 'fa-language',
            check: true
        }]);
    }

    render() {
        return (
            <li className='nav-item dropdown' onContextMenu={this.open.bind(this)} onClick={this.open.bind(this)}>>
                <i className='fa fa-globe nav-link'>
                    {` ${i18n.language.toUpperCase()}`} 
                </i>
            </li>
        );
    }
}

const putActionsToProps = dispatch => {
    return {
        openContextMenu: bindActionCreators(openContextMenu, dispatch)
    };
};

export default connect(()=> ({}), putActionsToProps)(Language);
