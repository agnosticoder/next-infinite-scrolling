import { useState } from 'react';
import useGetTitles from '../components/hooks/useGetTitles.js';

const Test = () => {
    const [query, setQuery] = useState('harry potter and in a');
    const [pageNumber, setPageNumber] = useState(1);
    const { isLoading, titles, hasMore, error } = useGetTitles(query, pageNumber);

    const onLoadMore = () => {
        setPageNumber(pageNumber + 1);
    };

    return (
        <div>
            <div>
                <input
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    type="text"
                    placeholder="search"
                />
            </div>

            {titles.map((title, i) => (
                <div key={i}>
                    {i + 1} {title}
                </div>
            ))}

            {hasMore ? (
                isLoading ? (
                    <div>Loading...</div>
                ) : (
                    <button onClick={onLoadMore}>load more</button>
                )
            ) : (
                <div>No more titles</div>
            )}
        </div>
    );
};

export default Test;
