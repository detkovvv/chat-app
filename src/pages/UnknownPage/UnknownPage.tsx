import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './UnknownPage.module.css';

export const UnknownPage: FC = () => {
    return (
        <div className={styles.container}>
            <h1>Page not found</h1>
            <NavLink className={styles.button} to='/'>
                back
            </NavLink>
        </div>
    );
};
