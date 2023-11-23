import React, { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import styles from './Sidebar.module.css';
import { getApiLink } from '../../helpers/api/getApiLink';
import { axiosInstance } from '../../helpers/axios';
import { useInputValue } from '../../hooks/useInput';
import { fetchContacts } from '../../store/asyncActions/contacts.js';
import { CustomDispatch } from '../../store/index.js';
import { Contact } from '../Contact/Contact';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';

export interface IContact {
    id: string;
    name: string;
    type: string;
}

const createNewContact = (value: string) => {
    return {
        id: crypto.randomUUID(),
        name: value,
        type: 'user',
    };
};

// TODO: переписать запросы через работу со store

export const Sidebar = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((store) => store.contacts.contactsList);
    const store = useSelector((store) => store);
    console.log(store);

    // const [contacts, setContacts] = useState([]);
    const [value, handleChange] = useInputValue();
    const [newContact, setNewContact] = useState('');
    const [invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    const currentContacts = useMemo(() => {
        if (!contacts) return [];
        return contacts.filter((item) => item.name.toUpperCase().includes(value.toUpperCase()));
    }, [contacts, value]);

    useEffect(() => {
        CustomDispatch(fetchContacts());
        console.log(contacts);
    }, []);

    const addNewContact = async (event: FormEvent<HTMLFormElement>) => {
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
                    setContacts([...contacts, createNewContact(newContact)]);
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
                <form className={styles.sidebarForm} onSubmit={addNewContact}>
                    <input
                        autoFocus={true}
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
                {currentContacts ? (
                    currentContacts.map((contact) => (
                        <Contact id={contact.id} key={contact.id} name={contact.name} />
                    ))
                ) : (
                    <div className={styles.clearContactList}>Список контактов пуст</div>
                )}
            </div>
        </div>
    );
};
