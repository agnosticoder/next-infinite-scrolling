import { useState } from 'react';
import useGetTitles from './hooks/useGetTitles.js';
import useInfinitePagination from './hooks/useInfinitePagination.js';

const App = () => {
    const [query, setQuery] = useState('harry potter and in a');
    const [pageNumber, setPageNumber] = useState(1);
    const { isLoading, titles, hasMore, error } = useGetTitles(query, pageNumber);
    const {setRef} = useInfinitePagination(setPageNumber, hasMore, isLoading);

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

            {titles.map((title, i) => {
                if (titles.length === i + 1) {
                    return (
                        <div ref={setRef} key={i}>
                            {i + 1} {title}
                        </div>
                    );
                }
                return (
                    <div key={i}>
                        {i + 1} {title}
                    </div>
                );
            })}
            {isLoading && <div>Loading...</div>}
            {(!hasMore && !isLoading) && <div>No more titles</div>}
        </div>
    );
};

export default App;
