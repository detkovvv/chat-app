import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage.jsx';
import { ChatPage } from './pages/ChatPage/ChatPage.jsx';
import './global.css';
import { WithAuthorized } from './pages/WithAuthorized.jsx';
import { WithSidebar } from './pages/WithSidebar.jsx';
import { UnknownPage } from './pages/UnknownPage.jsx';
import { MainPage } from './pages/MainPage/MainPage.jsx';
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
                    {/*<WithAuthorized isLoggedIn={isLoggedIn}>*/}
                    {/*    <WithSidebar>*/}
                    <Route path='/' element={<ChatPage isLoggedIn={isLoggedIn} />}></Route>
                    <Route path='/chat/:phoneNumber' element={<ChatPage />} />
                    {/*    </WithSidebar>*/}
                    {/*</WithAuthorized>*/}
                    <Route path='*' element={<UnknownPage />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default App;
