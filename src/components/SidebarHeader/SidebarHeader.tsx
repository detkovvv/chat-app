import { IconLogout } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './SidebarHeader.module.css';
import avatar from '../../assets/avatar.jpg';
import { clearAuthSession, getAuthSession } from '../../helpers/localStorage';
import { useAuthorization } from '../../hooks/useAithorization.js';

export const SidebarHeader = () => {
    const { setIsLoggedOut } = useAuthorization();
    const navigate = useNavigate();

    const handleLogOut = () => {
        const isLogOut: boolean = confirm('Вы действительно хотите выйти?');
        if (isLogOut) {
            clearAuthSession();
            setIsLoggedOut();
            navigate('/login');
        }
    };

    return (
        <div className={styles.sidebarHeader}>
            <div className={styles.avatar}>
                <img
                    alt='avatar'
                    className={styles.img}
                    src={avatar}
                />
            </div>
            <p className={styles.userName}>Вы вошли как: {getAuthSession().idInstance}</p>
            <Link className={styles.demoLink} to='/demo'>Демо</Link>
            <button aria-label='Выйти' className={styles.logoutButton} onClick={handleLogOut} type='button'><IconLogout className={styles.logoutIcon} /></button>
        </div>
    );
};
