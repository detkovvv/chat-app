import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthorizationPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <button onClick={() => navigate('chat', { replace: true })}>Войти</button>
                    </li>
                </ul>
            </nav>
        </>
    );
};
