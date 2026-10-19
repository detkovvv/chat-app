import { type FormEvent, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './DemoChatPage.module.css';
import { createDemoConversations, demoContacts, type DemoConversations } from './demoData';

const storageKey = 'chat-app-demo-v1';

const readConversations = (): DemoConversations => {
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
        if (saved && demoContacts.every((contact) => Array.isArray(saved[contact.id]))) {
            return saved as DemoConversations;
        }
    } catch {
        // Invalid demo data can be replaced with the initial conversation.
    }
    return createDemoConversations();
};

const formatTime = (value: number) =>
    new Intl.DateTimeFormat('ru', { hour: '2-digit', minute: '2-digit' }).format(value);

export const DemoChatPage = () => {
    const [conversations, setConversations] = useState(readConversations);
    const [selectedId, setSelectedId] = useState(demoContacts[0].id);
    const [query, setQuery] = useState('');
    const [draft, setDraft] = useState('');
    const [showConversation, setShowConversation] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const selectedContact =
        demoContacts.find((contact) => contact.id === selectedId) ?? demoContacts[0];
    const messages = conversations[selectedId] ?? [];
    const visibleContacts = demoContacts.filter((contact) =>
        contact.name.toLocaleLowerCase('ru').includes(query.toLocaleLowerCase('ru')),
    );

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(conversations));
    }, [conversations]);

    useEffect(() => {
        endRef.current?.scrollIntoView({ block: 'end' });
    }, [selectedId, messages.length]);

    const sendMessage = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const text = draft.trim();
        if (!text) return;
        setConversations((current) => ({
            ...current,
            [selectedId]: [
                ...(current[selectedId] ?? []),
                { id: crypto.randomUUID(), from: 'me', text, time: Date.now() },
            ],
        }));
        setDraft('');
    };

    const resetDemo = () => {
        setConversations(createDemoConversations());
        setSelectedId(demoContacts[0].id);
        setQuery('');
        setDraft('');
        setShowConversation(false);
    };

    return (
        <main className={styles.page}>
            <header className={styles.topbar}>
                <div>
                    <div className={styles.brand}>
                        Чат <span>Демо</span>
                    </div>
                    <p>Попробуйте интерфейс без регистрации и ключей API.</p>
                </div>
                <div className={styles.actions}>
                    <button className={styles.reset} onClick={resetDemo} type='button'>
                        Сбросить демо
                    </button>
                    <Link className={styles.apiLink} to='/login'>
                        Подключить Green API
                    </Link>
                </div>
            </header>

            <div className={`${styles.shell} ${showConversation ? styles.open : ''}`}>
                <aside aria-label='Контакты' className={styles.sidebar}>
                    <div className={styles.sidebarHeading}>
                        <h1>Сообщения</h1>
                        <span>{demoContacts.length}</span>
                    </div>
                    <label className={styles.searchLabel}>
                        <span className={styles.visuallyHidden}>Поиск контакта</span>
                        <input
                            onChange={(event) => setQuery(event.target.value)}
                            placeholder='Поиск по контактам'
                            type='search'
                            value={query}
                        />
                    </label>
                    <div className={styles.contacts}>
                        {visibleContacts.length === 0 && (
                            <p className={styles.noResults}>Контакты не найдены</p>
                        )}
                        {visibleContacts.map((contact) => {
                            const contactMessages = conversations[contact.id] ?? [];
                            const lastMessage = contactMessages[contactMessages.length - 1];
                            return (
                                <button
                                    aria-current={selectedId === contact.id ? 'true' : undefined}
                                    className={`${styles.contact} ${
                                        selectedId === contact.id ? styles.active : ''
                                    }`}
                                    key={contact.id}
                                    onClick={() => {
                                        setSelectedId(contact.id);
                                        setShowConversation(true);
                                    }}
                                    type='button'
                                >
                                    <span
                                        className={styles.avatar}
                                        style={{ backgroundColor: contact.color }}
                                    >
                                        {contact.initials}
                                    </span>
                                    <span className={styles.contactText}>
                                        <strong>{contact.name}</strong>
                                        <small>{lastMessage?.text ?? contact.subtitle}</small>
                                    </span>
                                    {lastMessage && <time>{formatTime(lastMessage.time)}</time>}
                                </button>
                            );
                        })}
                    </div>
                </aside>

                <section
                    aria-label={`Чат с ${selectedContact.name}`}
                    className={styles.conversation}
                >
                    <div className={styles.chatHeader}>
                        <button
                            aria-label='К списку чатов'
                            className={styles.back}
                            onClick={() => setShowConversation(false)}
                            type='button'
                        >
                            ←
                        </button>
                        <span
                            className={styles.avatar}
                            style={{ backgroundColor: selectedContact.color }}
                        >
                            {selectedContact.initials}
                        </span>
                        <div>
                            <strong>{selectedContact.name}</strong>
                            <small>{selectedContact.subtitle}</small>
                        </div>
                        <span className={styles.demoTag}>Демо</span>
                    </div>
                    <div aria-live='polite' className={styles.messageList}>
                        <p className={styles.demoNotice}>
                            Это демонстрационная переписка. Сообщения сохраняются только в этом
                            браузере.
                        </p>
                        {messages.map((message) => (
                            <div
                                className={`${styles.message} ${
                                    message.from === 'me' ? styles.outgoing : ''
                                }`}
                                key={message.id}
                            >
                                <p>{message.text}</p>
                                <time>{formatTime(message.time)}</time>
                            </div>
                        ))}
                        <div ref={endRef} />
                    </div>
                    <form className={styles.composer} onSubmit={sendMessage}>
                        <label className={styles.visuallyHidden} htmlFor='demo-message'>
                            Сообщение
                        </label>
                        <input
                            id='demo-message'
                            onChange={(event) => setDraft(event.target.value)}
                            placeholder='Напишите сообщение...'
                            value={draft}
                        />
                        <button disabled={!draft.trim()} type='submit'>
                            Отправить
                        </button>
                    </form>
                </section>
            </div>
        </main>
    );
};
