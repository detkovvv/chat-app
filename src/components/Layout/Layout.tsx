import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export const Layout: FC = () => {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
};
