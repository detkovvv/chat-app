import React, { type FormEvent, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Sidebar.module.css';
import { useInputValue } from '../../hooks/useInput';
import { fetchAddNewContact, fetchContacts } from '../../store/asyncActions/contacts.js';
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
        id: value + '@c.us',
        name: value,
        type: 'user',
    };
};

// TODO: переписать запросы через работу со store

export const Sidebar = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((store) => store.contacts.contactsList);
    const [value, handleChange] = useInputValue();
    const invalid = useSelector((store) => store.contacts.error);

    const currentContacts = useMemo(() => {
        if (!contacts) return [];
        return contacts.filter((item) => item.name.toUpperCase().includes(value.toUpperCase()));
    }, [contacts, value]);

    useEffect(() => {
        CustomDispatch(fetchContacts());
    }, []);

    // TODO: состояние isLoading/Error  - при ожидании запроса / ошибке

    const addNewContact = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await fetchAddNewContact(value, createNewContact);
        handleChange('');
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
            {invalid && <p className={styles.invalid}>{invalid}</p>}
            <div className={styles.sidebarChatList}>
                {currentContacts.map((contact) => (
                    <Contact id={contact.id} key={contact.id} name={contact.name} />
                ))}
            </div>
        </div>
    );
};