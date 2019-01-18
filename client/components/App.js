import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { withNamespaces } from 'react-i18next';

import Signup from './common/Signup';
import Navbar from './common/Navbar';
import Modal from './modals/Modal';
import ContextMenu from './contextmenu/ContextMenu';
import Notification from './common/Notification';

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
                <p>{this.props.t('ERROR', { item: 'page', artikel: 'Seite' })}</p>
            </div>;

        return (
            <BrowserRouter>
                <div className='app'>
                    <Notification/>
                    <Navbar/>
                    <div className='container'>
                        <Switch>
                            {!this.props.username && <Route path='/signup' component={Signup}/>}
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

App.propTypes = {
    username: PropTypes.string
};

const putStateToProps = state => state.authReducer;

export default withNamespaces()(connect(putStateToProps)(App));

