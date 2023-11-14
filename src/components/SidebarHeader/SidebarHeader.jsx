import React from 'react';
import { idLocalStorage, toLocalStorage } from '../../helpers/localStorage';
import { IconLogout } from '@tabler/icons-react';
import { useAuthorization } from '../../hooks/useAithorization';
import { useNavigate } from 'react-router-dom';
import styles from './SidebarHeader.module.css';

export const SidebarHeader = () => {
    const { setIsLoggedOut } = useAuthorization();
    const navigate = useNavigate();

    const handleLogOut = () => {
        let isLogOut = confirm('Вы действительно хотите выйти?');
        if (isLogOut) {
            toLocalStorage('idInstance', '');
            toLocalStorage('apiTokenInstance', '');
            setIsLoggedOut();
            navigate('/login');
        }
    };

    return (
        <div className={styles.sidebarHeader}>
            <img alt='avatar' src='src/assets/avatar.jpg' />
            <p className={styles.userName}>Вы вошли как: {idLocalStorage}</p>
            <IconLogout className={styles.logoutIcon} onClick={handleLogOut} />
        </div>
    );
};
