/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_USE_MOCKS: string
    readonly VITE_MOCK_DELAY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare module '*.css' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}
