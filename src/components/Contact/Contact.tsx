import styles from '../Sidebar/Sidebar.module.css';
import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

export const Contact: FC<{ name: string; id: string }> = ({ name, id }) => {
    const navigate = useNavigate();
    return (
        <div className={styles.user} onClick={() => navigate('/chat/' + id)}>
            {name}
        </div>
    );
};
