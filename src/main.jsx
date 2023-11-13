import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './global.css';
import { Provider } from 'react-redux';
import { authorization } from './store/authorization.store';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={authorization}>
            <App />
        </Provider>
    </React.StrictMode>,
);
