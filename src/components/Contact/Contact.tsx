import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Contact.module.css';

export const Contact: FC<{ name: string; id: string }> = ({ name, id }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.user} onClick={() => navigate('/chat/' + id)}>
            {name}
        </div>
    );
};
