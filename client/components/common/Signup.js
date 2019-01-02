import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signup } from '../../store/reducers/auth/actions';


class Signup extends Component {
    constructor (props, context) {
        super (props, context);
        
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        };
    }
    
    changeValue (val, event) {
        let state = {};
        state[val] = event.target.value;

        this.setState(state);
    }

    onSubmit (event) {
        event.preventDefault();

        this.props.signup(this.state);
    }
    
    render () {
        // TODO: move to router
        if (this.props.username) {
            window.history.pushState({}, '', '/');
            window.location.reload();

            return null;
        }

        let fileds = [{
            name: 'username',
            label: 'Username:',
            type: 'text',
            error: this.state.username.length === 0,
            errorMessage: 'This field is required'
        }, {
            name: 'email',
            label: 'Email:',
            type: 'email',
            error: this.state.email.length === 0,
            errorMessage: 'This field is required'
        }, {
            name: 'password',
            label: 'Password:',
            type: 'password',
            error: this.state.password.length === 0,
            errorMessage: 'This field is required'
        }, {
            name: 'confirmPassword',
            label: 'Confirm password:',
            type: 'password',
            error: this.state.password.length === 0 || this.state.password !== this.state.confirmPassword,
            errorMessage: this.state.password.length === 0 ? 'This field is required' : 'Passwords must match'
        }];

        return (
            <div className='row justify-content-md-center' style={{ paddingTop: '30px' }}>
                <form name='signupForm' onSubmit={this.onSubmit.bind(this)} className='col col-lg-6'>
                    <div className='form-group'>
                        {fileds.map(field => <div key={field.name} className=''>
                            <div className=''>
                                <label className=''>{field.label}</label>
                                <input autoComplete='on' className='form-control' type={field.type} onChange={this.changeValue.bind(this, field.name)} value={this.state[field.name]}/>
                            </div>
                            {field.error && <div className='text-danger'>{field.errorMessage}</div>}
                        </div>)}
                    </div>
                    <button className='btn btn-dark pull-right' disabled={fileds.some(field => field.error)} type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

const putStateToProps = state => state.authReducer;

const putActionsToProps = (dispatch) => {
    return {
        signup: bindActionCreators(signup, dispatch)
    };
};

export default connect(putStateToProps, putActionsToProps)(Signup);
