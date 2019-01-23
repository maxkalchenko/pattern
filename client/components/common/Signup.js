import React, { Component } from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signup } from '../../store/reducers/auth/actions';

import { DEBOUNCE, CANCELED } from '../../utils/constants';

const { CancelToken } = axios;

let cancel = {};
let timeouts = {};

class Signup extends Component {
    constructor (props, context) {
        super (props, context);
        
        this.state = {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            errors: { username: false, email: false },
            isLoading: { username: false, email: false }
        };
    }
    
    changeValue (val, event) {
        const { value } = event.target
        let isLoading = { ...this.state.isLoading };

        if (['username', 'email'].some(name => val === name)) {
            cancel[val] && cancel[val](CANCELED);

            isLoading[val] = true;
    
            clearTimeout(timeouts[val]);
    
            timeouts[val] = setTimeout(() => {
                axios({
                    method: 'POST',
                    url: '/api/users/validate',
                    cancelToken: new CancelToken(c => cancel[val] = c),
                    data: { [val]: value }
                }).then(() => this.setState({
                    errors: { ...this.state.errors, [val]: false },
                    isLoading: { username: false, email: false }
                }), error => error.message !== CANCELED && this.setState({
                    errors: { ...this.state.errors, [val]: true },
                    isLoading: { username: false, email: false }
                }));
            }, DEBOUNCE);
        }
        
        this.setState({ [val]: value, isLoading: isLoading });
    }

    onSubmit (event) {
        event.preventDefault();

        this.props.signup({ 
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }).then(() => {
            window.history.pushState({}, '', '/');
            window.location.reload();
        });
    }
    
    render () {
        const fileds = [{
            name: 'username',
            label: 'Username:',
            type: 'text',
            error: this.state.username.length === 0 || this.state.username.length > 255 || this.state.errors.username,
            errorMessage: this.state.errors.username ? 'Username already taken' : (this.state.username.length === 0 ? 'This field is required' : 'Invalid username'),
            isLoading: this.state.isLoading.username
        }, {
            name: 'email',
            label: 'Email:',
            type: 'email',
            error: this.state.errors.email || !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this.state.email),
            errorMessage: this.state.errors.email ? 'Email already taken' : (this.state.email.length === 0 ? 'This field is required' : 'Invalid email'),
            isLoading: this.state.isLoading.email
        }, {
            name: 'password',
            label: 'Password:',
            type: 'password',
            error: this.state.password.length <= 6 || this.state.password.length > 255,
            errorMessage: this.state.password.length < 6 ? 'Length should be more than 6' : 'Invalid password'
        }, {
            name: 'confirmPassword',
            label: 'Confirm password:',
            type: 'password',
            error: this.state.confirmPassword.length === 0 || this.state.password !== this.state.confirmPassword,
            errorMessage: this.state.confirmPassword.length === 0 ? 'This field is required' : 'Passwords must match'
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
                            {field.error && !field.isLoading && <div className='text-danger'>{field.errorMessage}</div>}
                            {field.isLoading && <div className='text-secondary'>Checking...</div>}
                        </div>)}
                    </div>
                    <button className='btn btn-dark pull-right' disabled={fileds.some(field => field.error || field.isLoading)} type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}

const putActionsToProps = (dispatch) => {
    return {
        signup: bindActionCreators(signup, dispatch)
    };
};

export default connect(() => ({}), putActionsToProps)(Signup);
