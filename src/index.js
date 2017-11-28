import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import registerServiceWorker from './lib/registerServiceWorker';
import { Provider } from 'react-redux'

ReactDOM.render(
        <App />,
    document.getElementById('root'));
registerServiceWorker();
