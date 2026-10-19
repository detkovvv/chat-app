import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { ErrorFallBack } from './components/ErrorFallBack/ErrorFallBack';
import { Layout } from './components/Layout/Layout';
import { DemoChatPage } from './demo/DemoChatPage';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { UnknownPage } from './pages/UnknownPage/UnknownPage';
import { store } from './store/index.js';

import './global.css';

export function App() {
    return (
        <HashRouter>
            <ErrorBoundary
                FallbackComponent={ErrorFallBack}
                onReset={() => {
                    console.log('render error');
                }}
            >
                <Provider store={store}>
                    <Routes>
                        <Route element={<Layout />} path='/'>
                            <Route element={<DemoChatPage />} index />
                            <Route element={<DemoChatPage />} path='demo' />
                            <Route element={<AuthorizationPage />} path='login' />
                            <Route element={<ChatPage />} path='live' />
                            <Route element={<ChatPage />} path='live/chat/:phoneNumber' />
                            <Route element={<UnknownPage />} path='*' />
                        </Route>
                    </Routes>
                </Provider>
            </ErrorBoundary>
        </HashRouter>
    );
}
