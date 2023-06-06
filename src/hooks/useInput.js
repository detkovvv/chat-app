import { useCallback, useState } from 'react';

export const useInputValue = () => {
    const [value, setValue] = useState('');

    const handleChange = useCallback((event) => setValue(event.target.value));

    return [value, handleChange];
};
