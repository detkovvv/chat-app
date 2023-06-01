import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage.jsx';
import { ChatPage } from './pages/ChatPage/ChatPage.jsx';
import './global.css';
import { UnknownPage } from './pages/UnknownPage/UnknownPage.jsx';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallBack } from './components/ErrorFallBack/ErrorFallBack.jsx';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [state, setState] = useState('');

    return (
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorFallBack} onReset={() => setState('')}>
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
                    <Route
                        path='/'
                        element={<ChatPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
                    ></Route>
                    <Route path='/chat/:phoneNumber' element={<ChatPage />} />
                    <Route path='*' element={<UnknownPage />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default App;
