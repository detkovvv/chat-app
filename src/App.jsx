import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage.jsx';
import { ChatPage } from './pages/ChatPage/ChatPage.jsx';
import { ErrorBoundary } from './pages/ErrorBoundary.jsx';
import './global.css';
import { WithAuthorized } from './pages/WithAuthorized.jsx';

const App = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <Routes>
                    <Route path='/login' element={<AuthorizationPage />}></Route>
                    <WithAuthorized>
                        <WithSidebar>
                            <Route path='/' element={<AuthorizationPage />}></Route>
                            <Route path='/chat/:phoneNumber' element={<ChatPage />} />
                        </WithSidebar>
                    </WithAuthorized>
                    <Route path='*' element={<UnknownPage />} />
                </Routes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default App;
