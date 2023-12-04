import { IconLogout } from '@tabler/icons-react';
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
            toLocalStorage('wid', '');
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
                    src='https://pps.whatsapp.net/v/t61.24694-24/359687880_663953382289350_5037816929807844825_n.jpg?ccb=11-4&oh=01_AdSNwTvbxnLdjY8ykxTLjrKCUF8sCzxoF11LRKdnODRc5w&oe=657AA7A1&_nc_sid=e6ed6c&_nc_cat=104'
                />
            </div>
            <p className={styles.userName}>Вы вошли как: {idLocalStorage}</p>
            <IconLogout className={styles.logoutIcon} onClick={handleLogOut} />
        </div>
    );
};
