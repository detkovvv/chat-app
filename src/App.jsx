import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { UnknownPage } from './pages/UnknownPage/UnknownPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './components/ErrorFallBack/ErrorFallBack';
import { apiLocalStorage, idLocalStorage } from './helpers/localStorage';
import { Layout } from './components/Layout/Layout';
import './global.css';
import { useAuthorization } from './hooks/useAithorization';
import { authStore } from './store/authorization.store';
import { Provider } from 'react-redux';

const useInitAuth = () => {
    const { setIsLoggedIn } = useAuthorization();

    useEffect(() => {
        setIsLoggedIn(!!apiLocalStorage && !!idLocalStorage);
    }, []);
};

const WithAuth = ({ children }) => {
    useInitAuth();
    return children;
};

export function App() {
    return (
        <BrowserRouter>
            <ErrorBoundary
                FallbackComponent={ErrorFallBack}
                onReset={() => {
                    console.log('render error');
                }}
            >
                <Provider store={authStore}>
                    <WithAuth>
                        <Routes>
                            <Route element={<Layout />} path='/'>
                                <Route
                                    element={
                                        <AuthorizationPage
                                        // isLoggedIn={isLoggedIn}
                                        // setIsLoggedIn={setIsLoggedIn}
                                        />
                                    }
                                    path='login'
                                />
                                <Route
                                    element={
                                        <ChatPage
                                        // isLoggedIn={isLoggedIn}
                                        // setIsLoggedIn={setIsLoggedIn}
                                        />
                                    }
                                    index
                                />
                                <Route
                                    element={
                                        <ChatPage
                                        // isLoggedIn={isLoggedIn}
                                        // setIsLoggedIn={setIsLoggedIn}
                                        />
                                    }
                                    path='chat/:phoneNumber'
                                />
                                <Route element={<UnknownPage />} path='*' />
                            </Route>
                        </Routes>
                    </WithAuth>
                </Provider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}
