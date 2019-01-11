import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from './common/Signup';
import Navbar from './common/Navbar';
import Modal from './modals/Modal';
import ContextMenu from './contextmenu/ContextMenu'

import Posts from '../pages/Posts';
import News from '../pages/News';

import '../styles/app.css';

class App extends Component {
    componentDidMount() {
        console.log('APP DidMount');
    }

    render() {
        let component = () =>
            <div className='text-center' style={{ paddingTop: '100px' }}>
                <h1>Oops!</h1>
                <h2>404 Not Found</h2>
                <p>Sorry, an error has occured, Requested page not ready yet.</p>
            </div>;

        return (
            <BrowserRouter>
                <div className='app'>
                    <Navbar/>
                    <div className='container'>
                        <Switch>
                            <Route path='/signup' component={Signup}/>
                            <Route path='/community' component={Posts}/>
                            <Route path='/news' component={News}/>
                            <Route component={component}/>
                        </Switch>
                    </div>
                    <Modal/>
                    <ContextMenu/>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;

