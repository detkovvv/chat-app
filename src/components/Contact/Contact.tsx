import styles from '../Sidebar/Sidebar.module.css';
import React, { FC } from 'react';

export const Contact: FC<{ name: string; id: string }> = ({ name, id }) => {
    return (
        <div className={styles.user} onClick={() => {}}>
            {name}
        </div>
    );
};
