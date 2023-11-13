import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { idLocalStorage, toLocalStorage } from '../../helpers/localStorage';
import { axiosInstance } from '../../helpers/axios/index';
import { Contact } from '../Contact/Contact';
import { useInputValue } from '../../hooks/useInput';
import { getApiLink } from '../../helpers/api/getApiLink';
import { IconLogout } from '@tabler/icons-react';
import styles from './Sidebar.module.css';

export const Sidebar = ({ setIsLoggedIn }) => {
    const [value, setValue] = useInputValue('');
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
    }, []);

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
                    console.log(newContact);

                    setValue('');
                    setContacts([...contacts, newContact]);
                    console.log(contacts);
                    navigate('/chat/' + newContact + '@c.us');
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

    const handleLogOut = () => {
        let isLogOut = confirm('Вы действительно хотите выйти?');
        if (isLogOut) {
            toLocalStorage('idInstance', '');
            toLocalStorage('apiTokenInstance', '');
            setIsLoggedIn(false);
            navigate('/login');
        }
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <img alt='avatar' src='src/assets/avatar.jpg' />
                <p className={styles.userName}>Вы вошли как: {idLocalStorage}</p>
                <IconLogout className={styles.logoutIcon} onClick={handleLogOut} />
            </div>
            <div className={styles.sidebarSearch}>
                <form className={styles.sidebarForm} onSubmit={searchContact}>
                    <input
                        autoFocus='autofocus'
                        name='user'
                        onChange={setValue}
                        placeholder='Введите имя или номер телефона'
                        required
                        size={10}
                        type='phone'
                        value={value}
                    />
                    <button className={styles.startChat} type='submit'>
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



//TODO: вынести sidebarHeader в отдельный компонент