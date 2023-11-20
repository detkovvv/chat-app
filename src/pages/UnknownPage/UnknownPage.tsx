import { type FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './UnknownPage.module.css';

export const UnknownPage: FC = ({ resetErrorBoundary }) => {
    return (
        <div className={styles.container}>
            <h1>Page not found</h1>
            <NavLink className={styles.button} onClick={resetErrorBoundary} to='/'>
                back
            </NavLink>
        </div>
    );
};
