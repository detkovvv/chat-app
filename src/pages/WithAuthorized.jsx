import { Navigate } from 'react-router-dom';

export const WithAuthorized = ({ children, isLoggedIn }) => {
    return isLoggedIn ? children : <Navigate to='login' />;
};
