import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ErrorFallBack } from './components/ErrorFallBack/ErrorFallBack';
import { Layout } from './components/Layout/Layout';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { UnknownPage } from './pages/UnknownPage/UnknownPage';
import { store } from './store/index.js';

import './global.css';

export function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary
                FallbackComponent={ErrorFallBack}
                onReset={() => {
                    console.log('render error');
                }}
            >
                <Provider store={store}>
                    <Routes>
                        <Route element={<Layout />} path='/'>
                            <Route element={<AuthorizationPage />} path='login' />
                            <Route element={<ChatPage />} index />
                            <Route element={<ChatPage />} path='chat/:phoneNumber' />
                            <Route element={<UnknownPage />} path='*' />
                        </Route>
                    </Routes>
                </Provider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}
