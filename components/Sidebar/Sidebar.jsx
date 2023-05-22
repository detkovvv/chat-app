import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { apiTokenInstance, idInstance, toLocalStorage } from '../../helpers/helpers.js';
import axios from 'axios';
import { API_URL } from '../../helpers/api.js';

export const Sidebar = () => {
    const [user, setUser] = useState('');
    const [invalid, setInvalid] = useState(false);
    const API_SEND = API_URL + `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`;
    const API_DEL = API_URL + `/waInstance${idInstance}/deleteMessage/${apiTokenInstance}`;

    const [id, setId] = useState('');

    const startChat = async (event) => {
        event.preventDefault();

        const checking = await axios
            .post(API_SEND, {
                chatId: `${user}@c.us`,
                message: 'проверка связи',
            })
            .then((response) => {
                console.log(response.data);
                toLocalStorage('phone', user);
                setInvalid(false);
            })
            .catch((error) => {
                setInvalid(true);
                console.log(error.message);
            });

        setId(checking.data.idMessage);
        console.log(id);
    };

    //удаление тестового сообщения
    // useEffect(async () => {
    //     await axios
    //         .post(API_DEL, {
    //             chatId: `${user}@c.us`,
    //             idMessage: { id },
    //         })
    //         .then((response) => {
    //             console.log(response.data);
    //             console.log(id);
    //         })
    //         .catch((error) => {
    //             setInvalid(true);
    //             console.log(error.message);
    //         });
    // }, [id]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>id пользователя: {idInstance}</div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarForm} onSubmit={startChat}>
                    <input
                        type='phone'
                        name='user'
                        placeholder='79996663311'
                        autoFocus='autofocus'
                        value={user}
                        required
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <button type='submit' className={styles.startChat}>
                        >
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>номер не найден</p>}
            <div className={styles.sidebarChatList}>
                {user && <div className={styles.user}>{user}</div>}
            </div>
        </div>
    );
};
