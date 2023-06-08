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
                        path='/login'
                        element={
                            <AuthorizationPage
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        }
                    ></Route>
                    <Route path='/' element={<ChatPage isLoggedIn={isLoggedIn} />}></Route>
                    <Route
                        path='/chat/:phoneNumber'
                        element={<ChatPage isLoggedIn={isLoggedIn} />}
                    />
                    <Route path='*' element={<UnknownPage />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default App;
