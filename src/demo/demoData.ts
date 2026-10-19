export interface DemoContact {
    id: string;
    name: string;
    initials: string;
    subtitle: string;
    color: string;
}

export interface DemoMessage {
    id: string;
    from: 'me' | 'them';
    text: string;
    time: number;
}

export type DemoConversations = Record<string, DemoMessage[]>;

export const demoContacts: DemoContact[] = [
    {
        id: 'anna',
        name: 'Анна Смирнова',
        initials: 'АС',
        subtitle: 'Дизайн проекта',
        color: '#dce7f8',
    },
    {
        id: 'team',
        name: 'Команда проекта',
        initials: 'КП',
        subtitle: 'Общий чат',
        color: '#e8def5',
    },
    {
        id: 'dmitry',
        name: 'Дмитрий Орлов',
        initials: 'ДО',
        subtitle: 'Разработка',
        color: '#f6e5d5',
    },
];

export const createDemoConversations = (): DemoConversations => {
    const morning = new Date();
    morning.setHours(10, 15, 0, 0);
    const at = (minutes: number) => morning.getTime() + minutes * 60_000;

    return {
        anna: [
            {
                id: 'a1',
                from: 'them',
                text: 'Привет! Посмотрела обновлённые макеты. Карточки проектов стали заметно чище.',
                time: at(0),
            },
            {
                id: 'a2',
                from: 'me',
                text: 'Отлично! Я ещё проверю мобильную версию и пришлю ссылку на демо.',
                time: at(4),
            },
            {
                id: 'a3',
                from: 'them',
                text: 'Договорились. Особенно интересно посмотреть экран на узком телефоне.',
                time: at(7),
            },
        ],
        team: [
            {
                id: 't1',
                from: 'them',
                text: 'Доброе утро! Сегодня проверяем сценарии таблицы и чата.',
                time: at(-48),
            },
            {
                id: 't2',
                from: 'me',
                text: 'Я подготовил демоданные. Можно тестировать без подключения к API.',
                time: at(-41),
            },
        ],
        dmitry: [
            {
                id: 'd1',
                from: 'them',
                text: 'Сборка прошла. Обновлённая версия готова к проверке.',
                time: at(-97),
            },
        ],
    };
};
