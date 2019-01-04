import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { closeModal } from '../../store/reducers/modal/actions';
import { auth } from '../../store/reducers/auth/actions';

class LoginModal extends Component {
    constructor (props, context) {
        super (props, context);
        
        this.state = {
            identifier: 'taylorswift',
            password: '14877Taylor'
        };
    }

    changeValue (val, event) {
        let state = {};
        state[val] = event.target.value;

        this.setState(state);
    }

    onLogin (event) {
        event.preventDefault();

        this.props.auth(this.state)
            .then(() => {
                window.location.reload();

                // this.props.closeModal();
            });
    }

    render() {
        let fileds = [{
            name: 'identifier',
            label: 'Username or Email:',
            type: 'text',
            error: this.state.identifier.length === 0
        }, {
            name: 'password',
            label: 'Password:',
            type: 'password',
            error: this.state.password.length === 0
        }];

        return (
            <>
                <div className='modal-body'>
                     <div className='panel justify-content-md-center'>
                        <form name='signupForm' className='panel-body'>
                            <div className='form-group'>
                                {fileds.map(field => <div key={field.name}>
                                    <label>{field.label}</label>
                                    <input autoComplete='on' className='form-control' type={field.type} onChange={this.changeValue.bind(this, field.name)} value={this.state[field.name]}/>
                                </div>)}
                            </div>
                        </form>
                    </div>
                </div>
                <div className='modal-footer'>
                    <button type='button' onClick={this.onLogin.bind(this)} className='btn btn-dark' disabled={fileds.some(field => field.error)}>Submit</button>
                    <button type='button' onClick={this.props.closeModal} className='btn btn-danger'>Close</button>
                </div>
            </>
        );
    }
}

const putStateToProps = state => state;

const putActionsToProps = (dispatch) => {
    return {
        closeModal: bindActionCreators(closeModal, dispatch),
        auth: bindActionCreators(auth, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(LoginModal);
