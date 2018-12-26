import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './Signup';
import Navbar from './Navbar';

import '../styles/app.css';

class App extends Component {
    render() {
        let component = () => <div style={{
            margin: '5px',
            padding: '.375rem .75rem',
            borderRadius: '.25rem'
        }}>Welcome to my site</div>;

        return (
            <BrowserRouter>
                <div className='app'>
                    <Navbar/>
                    <Switch>
                        <Route path='/signup' component={Signup}/>
                        <Route component={component}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

