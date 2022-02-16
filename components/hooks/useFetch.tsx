//todo: convert this file to typescript for better implemenation documentation

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react';

interface HandlerProps {
    url: string,
    signal: AbortSignal,
    options?: RequestInit,
    setIsLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<boolean>>
}

const handler = async ({ url, signal, options = {}, setIsLoading, setError }: HandlerProps) => {
    try {
        setIsLoading(true);
        const res = await fetch(url, { ...options, signal });
        const data = await res.json();
        console.log('FetchCancel: got response');
        setIsLoading(false);
        return data;
    } catch (err: any) {
        if (err.name === 'AbortError') {
            console.log('FetchCanel: request aborted');
            return;
        }
        setIsLoading(false);
        setError(true);
        console.log({ err });
    }
};


const useFetch = (url:string, options:RequestInit = {}) => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false)


    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;
        handler({url, signal, options, setIsLoading, setError})
            .then((res) => {
                setData(res);
            });

        //* so that our query won't run on every single character input
        return () => controller.abort();
    }, [url]);

    return [isLoading, error, data] as const;
};

export default useFetch;
