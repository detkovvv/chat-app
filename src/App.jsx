import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from '../pages/AuthorizationPage/AuthorizationPage.jsx';
import { ChatPage } from '../pages/ChatPage/ChatPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthorizationPage />}>
                    <Route path='chat' element={<ChatPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
