import useFetch from './useFetch.js'
import filter from '../../lib/filter.js';
import { useEffect, useMemo, useState } from 'react';

const useGetTitles = (query, pageNumber) => {
    const [titles, setTitles] = useState([]);
    const [hasMore, setHasMore] = useState(true);

    const url = `https://openlibrary.org/search.json?q=${query}&page=${pageNumber}`;
    const [isLoading, error, data] = useFetch(url);

    //* useEffect executes in order they are implemented
    //* batching useEffect correctly is really important otherwise
    //* you may get unsual ui responses

    useEffect(() => {
        setTitles([]);
    }, [query]);


    useEffect(() => {
        const newTitles = filter(data);
        if(newTitles.length !== 0){
            return setTitles(prev => [...prev, ...newTitles]);
        }
        //? is it gonna rerender infinite time, be careful
    }, [data]);

    useEffect(() => {
        data?.docs && setHasMore(data.docs.length > 0);
    }, [data])

    return {isLoading, error, titles, hasMore};
}

export default useGetTitles;
