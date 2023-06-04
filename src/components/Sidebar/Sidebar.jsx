import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { apiLocalStorage, idLocalStorage } from '../../helpers/localStorage.js';
import { axiosInstance } from '../../helpers/axios/index.js';
import { getApiLink } from '../../helpers/getApiLink.js';

// eslint-disable-next-line react/prop-types
export const Sidebar = ({ onChange }) => {
    const [value, setValue] = useState('');
    const [phone, setPhone] = useState('');
    const [invalid, setInvalid] = useState(false);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    useEffect(() => {
        onChange(phone);
    }, [phone]);

    const searchContact = async (event) => {
        event.preventDefault();
        axiosInstance
            .post(getApiLink('checkWhatsapp', idLocalStorage, apiLocalStorage), {
                phoneNumber: `${value}`,
            })
            .then((response) => {
                if (response.data.existsWhatsapp === true) {
                    setInvalid(false);
                    setPhone(value);
                    setValue('');
                } else {
                    setInvalid(true);
                    setValue('');
                }
            })
            .catch((error) => {
                setInvalid(true);
                console.log(error.message);
                setValue('');
            });
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>id пользователя: {idLocalStorage}</div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarForm} onSubmit={searchContact}>
                    <input
                        type='phone'
                        name='user'
                        placeholder='79996663311'
                        autoFocus='autofocus'
                        value={value}
                        required
                        size={10}
                        onChange={handleChange}
                    />
                    <button type='submit' className={styles.startChat}>
                        {'>'}
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>номер не найден</p>}
            <div className={styles.sidebarChatList}>
                {phone && <div className={styles.user}>{phone}</div>}
            </div>
        </div>
    );
};
