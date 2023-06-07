import React, { useEffect, useMemo, useState } from 'react';
import styles from './Sidebar.module.css';
import { apiLocalStorage, idLocalStorage } from '../../helpers/localStorage';
import { axiosInstance } from '../../helpers/axios/index';
import { getApiLink } from '../../helpers/getApiLink';
import { Contact } from '../Contact/Contact';
import { useInputValue } from '../../hooks/useInput';

export const Sidebar = () => {
    const [value, setValue] = useInputValue('');
    const [phone, setPhone] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [contacts, setContacts] = useState([]);

    const currentContacts = useMemo(() => {
        if (contacts.length === 0) return [];
        return contacts.filter((item) => item.name.toUpperCase().includes(value.toUpperCase()));
    }, [contacts, value]);

    // поиск по contacts, по enter

    useEffect(() => {
        axiosInstance
            .post(getApiLink('getContacts', idLocalStorage, apiLocalStorage))
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

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
                    if (!contacts.toUpperCase().includes(value.toUpperCase())) {
                        setContacts([...contacts, value]);
                    }
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
                        onChange={setValue}
                    />
                    <button type='submit' className={styles.startChat}>
                        {'>'}
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>номер не найден</p>}
            <div className={styles.sidebarChatList}>
                {currentContacts.map((contact) => (
                    <Contact name={contact.name} id={contact.id} key={contact.id} />
                ))}
            </div>
        </div>
    );
};
