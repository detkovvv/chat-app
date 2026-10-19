import React, { type FormEvent, useEffect, useMemo, useState } from 'react';

import styles from './Sidebar.module.css';
import { useInputValue } from '../../hooks/useInput';
import { fetchAddNewContact, fetchContacts } from '../../store/asyncActions/contacts.js';
import { type IContact } from '../../store/contactsReducer.js';
import { CustomDispatch, useAppSelector } from '../../store/index.js';
import { Contact } from '../Contact/Contact';
import { SidebarHeader } from '../SidebarHeader/SidebarHeader';

const createNewContact = (value: string): IContact => {
    return {
        id: value + '@c.us',
        name: value,
        type: 'user',
    };
};

export const Sidebar = () => {
    const contacts = useAppSelector((store) => store.contacts.contactsList);
    const [value, handleChangeValue, clearValue] = useInputValue();
    const [query, setQuery] = useState('');
    const invalid = useAppSelector((store) => store.contacts.error);
    const isLoading = useAppSelector((store) => store.contacts.isLoading);

    const currentContacts = useMemo(() => {
        if (!contacts) return [];
        return contacts.filter((item) => item.name.toUpperCase().includes(query.toUpperCase()));
    }, [contacts, query]);

    useEffect(() => {
        CustomDispatch(fetchContacts());
    }, []);

    const addNewContact = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const phoneNumber = value.replace(/\D/g, '');
        if (!phoneNumber) return;
        CustomDispatch(fetchAddNewContact(phoneNumber, createNewContact));
        clearValue();
    };

    return (
        <div className={styles.sidebar}>
            <SidebarHeader />
            <div className={styles.sidebarSearch}>
                <input
                    aria-label='Поиск контакта'
                    className={styles.searchInput}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder='Поиск контакта'
                    type='search'
                    value={query}
                />
                <form className={styles.sidebarForm} onSubmit={addNewContact}>
                    <input
                        aria-label='Номер нового контакта'
                        className={styles.input}
                        name='user'
                        onChange={handleChangeValue}
                        placeholder='Номер нового контакта'
                        required
                        type='tel'
                        value={value}
                    />
                    <button
                        className={isLoading ? styles.loadingButton : styles.addContact}
                        type='submit'
                    >
                        добавить
                    </button>
                </form>
            </div>
            {invalid && <p className={styles.invalid}>{invalid}</p>}
            <div className={styles.sidebarChatList}>
                {currentContacts.map((contact) => (
                    <Contact id={contact.id} key={contact.id} name={contact.name} />
                ))}
            </div>
        </div>
    );
};
