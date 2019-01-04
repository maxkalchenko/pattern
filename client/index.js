import React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { defaults } from './utils/axios';

defaults();

render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
