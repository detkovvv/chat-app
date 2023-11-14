import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../helpers/axios/index';
import { Contact } from '../Contact/Contact';
import { useInputValue } from '../../hooks/useInput';
import { getApiLink } from '../../helpers/api/getApiLink';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
    const [value, handleChange] = useInputValue('');
    const [newContact, setNewContact] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    const currentContacts = useMemo(() => {
        if (contacts.length === 0) return [];
        return contacts.filter((item) => item.name.toUpperCase().includes(value.toUpperCase()));
    }, [contacts, value]);

    useEffect(() => {
        axiosInstance
            .post(getApiLink('getContacts'))
            .then((response) => {
                setContacts(response.data);
            })
            .catch((error) => console.log(error));
    }, [invalid]);

    const searchContact = async (event) => {
        event.preventDefault();
        axiosInstance
            .post(getApiLink('checkWhatsapp'), {
                phoneNumber: `${value}`,
            })
            .then((response) => {
                if (response.data.existsWhatsapp) {
                    setInvalid(false);
                    setNewContact(value);
                    handleChange('');
                    setContacts([...contacts, newContact]);
                    navigate('/chat/' + newContact + '@c.us');
                } else {
                    setInvalid(true);
                    handleChange('');
                }
            })
            .catch((error) => {
                console.log(value);
                setInvalid(true);
                console.log(error.message);
                handleChange('');
            });
    };

    return (
        <div className={styles.sidebar}>
            <SidebarHeader />
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarForm} onSubmit={searchContact}>
                    <input
                        autoFocus='autofocus'
                        className={styles.input}
                        name='user'
                        onChange={handleChange}
                        placeholder='Введите имя или номер телефона'
                        required
                        size={10}
                        type='phone'
                        value={value}
                    />
                    <button className={styles.addContact} type='submit'>
                        добавить
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>номер не найден</p>}
            <div className={styles.sidebarChatList}>
                {currentContacts.map((contact) => (
                    <Contact id={contact.id} key={contact.id} name={contact.name} />
                ))}
            </div>
        </div>
    );
};
