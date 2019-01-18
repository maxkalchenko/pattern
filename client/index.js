import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { defaults } from './utils/axios';
import './i18n/i18n';

defaults();

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
