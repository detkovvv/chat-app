import React, { type FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Contact.module.css';

// TODO: добавить аватар для контакта (круг с заглавной буквой имени)

export const Contact: FC<{ name: string; id: string }> = ({ name, id }) => {
    const navigate = useNavigate();

    return (
        <button className={styles.user} onClick={() => navigate('/live/chat/' + id)} type='button'>
            <div className={styles.userAvatar}>{name[0]}</div>
            {name}
        </button>
    );
};
