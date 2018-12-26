import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signup } from '../store/reducers/auth/actions';


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
        let fileds = [{
            name: 'username',
            label: 'Username:',
            type: 'text',
            error: this.state.username.length === 0
        }, {
            name: 'email',
            label: 'Email:',
            type: 'email',
            error: this.state.email.length === 0
        }, {
            name: 'password',
            label: 'Password:',
            type: 'password',
            error: this.state.password.length === 0
        }, {
            name: 'confirmPassword',
            label: 'Confirm password:',
            type: 'password',
            error: this.state.password.length === 0 || this.state.password !== this.state.confirmPassword
        }];

        return (
            <form name='signupForm' style={{
                margin: '5vh'
            }} onSubmit={this.onSubmit.bind(this)} className='form-control'>
                {fileds.map(field => <div key={field.name}>
                    <div className='input'>
                        <label style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>{field.label}</label>
                        <input autoComplete='on' style={{
                            borderColor: '#343a40',
                            border: '1px solid',
                            margin: '5px',
                            padding: '.375rem .75rem',
                            fontSize: '1rem',
                            width: '225px',
                            borderRadius: '.25rem'
                        }} type={field.type} onChange={this.changeValue.bind(this, field.name)} value={this.state[field.name]}/>
                    </div>
                    {field.error && <div style={{
                        color: '#721c24',
                        backgroundColor: '#f5c6cb',
                        width: '225px',
                        display: 'inline-flex',
                        flexDirection: 'column'
                    }}>Error</div>}
                </div>)}
                <button style={{
                    color: '#fff',
                    backgroundColor: '#343a40',
                    borderColor: '#343a40',
                    border: '1px solid transparent',
                    margin: '5px',
                    padding: '.375rem .75rem',
                    fontSize: '1rem',
                    width: '225px',
                    borderRadius: '.25rem'
                }} type='submit'>Click</button>
            </form>
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
