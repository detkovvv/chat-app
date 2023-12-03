import { IconLogout } from '@tabler/icons-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './SidebarHeader.module.css';
import { getAvatar } from '../../helpers/getAvatar.js';
import { idLocalStorage, toLocalStorage, wid } from '../../helpers/localStorage';
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
    // const myAvatar = getAvatar(wid);

    return (
        <div className={styles.sidebarHeader}>
            <div className={styles.avatar}>
                <img alt='avatar' className={styles.img} src={''} />
            </div>
            <p className={styles.userName}>Вы вошли как: {idLocalStorage}</p>
            <IconLogout className={styles.logoutIcon} onClick={handleLogOut} />
        </div>
    );
};
