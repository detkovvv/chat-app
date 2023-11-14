import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import { UnknownPage } from './pages/UnknownPage/UnknownPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './components/ErrorFallBack/ErrorFallBack';
import { apiLocalStorage, idLocalStorage } from './helpers/localStorage';
import { Layout } from './components/Layout/Layout';
import { useAuthorization } from './hooks/useAithorization';
import { authStore } from './store/authorizationStore';
import { Provider } from 'react-redux';
import './global.css';

//TODO: при обновлении страницы store приходит к дефолтным значениям, необходимо его связать с localStorage,
//      т.к. вынос логики navigate на верхний уровень отменяет работу остального роутинга

const useInitAuth = () => {
    const { setIsLoggedIn } = useAuthorization();

    if (!!apiLocalStorage && !!idLocalStorage) setIsLoggedIn(idLocalStorage, apiLocalStorage);
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
                                <Route element={<AuthorizationPage />} path='login' />
                                <Route element={<ChatPage />} index />
                                <Route element={<ChatPage />} path='chat/:phoneNumber' />
                                <Route element={<UnknownPage />} path='*' />
                            </Route>
                        </Routes>
                    </WithAuth>
                </Provider>
            </ErrorBoundary>
        </BrowserRouter>
    );
}
