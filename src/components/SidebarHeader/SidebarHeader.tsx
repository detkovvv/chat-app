import { IconLogout } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SidebarHeader.module.css';
import { idLocalStorage, toLocalStorage } from '../../helpers/localStorage';
import { useAuthorization } from '../../hooks/useAithorization.js';

export const SidebarHeader = () => {
    const { setIsLoggedOut } = useAuthorization();
    const navigate = useNavigate();

    const handleLogOut = () => {
        const isLogOut: boolean = confirm('Вы действительно хотите выйти?');
        if (isLogOut) {
            toLocalStorage('idInstance', '');
            toLocalStorage('apiTokenInstance', '');
            setIsLoggedOut();
            navigate('/login');
        }
    };

    return (
        <div className={styles.sidebarHeader}>
            <div className={styles.avatar}>
                <img alt='avatar' className={styles.img} src='src/assets/avatar.jpg' />
            </div>
            <p className={styles.userName}>Вы вошли как: {idLocalStorage}</p>
            <IconLogout className={styles.logoutIcon} onClick={handleLogOut} />
        </div>
    );
};