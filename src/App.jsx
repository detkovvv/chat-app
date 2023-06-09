import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage';
import { ChatPage } from './pages/ChatPage/ChatPage';
import './global.css';
import { UnknownPage } from './pages/UnknownPage/UnknownPage';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './components/ErrorFallBack/ErrorFallBack';
import { apiLocalStorage, idLocalStorage } from './helpers/localStorage';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        setIsLoggedIn(!!apiLocalStorage && !!idLocalStorage);
    }, [apiLocalStorage, idLocalStorage]);

    return (
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => {}}>
                <Routes>
                    <Route
                        element={
                            <AuthorizationPage
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        }
                        path='/login'
                     />
                    <Route element={<ChatPage isLoggedIn={isLoggedIn} />} path='/' />
                    <Route
                        element={<ChatPage isLoggedIn={isLoggedIn} />}
                        path='/chat/:phoneNumber'
                     />
                    <Route element={<UnknownPage />} path='*' />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default App;
