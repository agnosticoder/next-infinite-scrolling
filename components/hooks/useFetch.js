//todo: convert this file to typescript for better implemenation documentation

import { useEffect, useState } from 'react';

const handler = async ({ url, signal, options, setIsLoading, setError}) => {
    try {
        setIsLoading(true);
        const res = await fetch(url, { signal, ...options });
        const data = await res.json();
        setIsLoading(false)
        return data;
    } catch (err) {
        if(err.name === 'AbortError') return;
        setIsLoading(false);
        setError(true);
        console.log({err});
    }
};

const useFetch = (url, options = {}) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false)

    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        handler({url, signal, options, setIsLoading, setError})
            .then((res) => {
                console.log('FetchCancel: got response');
                setData(res);
            });

        //* so that our query won't run on every single character input
        return () => controller.abort();
    }, [url]);

    return [isLoading, error, data];
};

export default useFetch;
