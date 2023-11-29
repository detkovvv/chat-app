import { type ChangeEvent, useCallback, useState } from 'react';

export const useInputValue = () => {
    const [value, setValue] = useState('');

    const handleChangeValue = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
        [],
    );

    return [value, handleChangeValue] as const;
};
