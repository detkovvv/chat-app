import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './Layout.module.css';

export const Layout = () => {
    return (
        <div className={styles.wrapper}>
            <Outlet />
        </div>
    );
};
