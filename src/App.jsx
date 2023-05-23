import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage/AuthorizationPage.jsx';
import { ChatPage } from './pages/ChatPage/ChatPage.jsx';
import './global.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<AuthorizationPage />}></Route>
                <Route path='chat' element={<ChatPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
