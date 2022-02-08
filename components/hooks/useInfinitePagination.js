const { useRef, useEffect, useState } = require('react');

const useInfinitePagination = (setPageNumber, hasMore, isLoading) => {
    // const ref = useRef();
    const [ref, setRef] = useState();

    useEffect(() => {
        //* don't change the page is the titles are already loading
        if(isLoading) return;
        const observer = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting && hasMore) {
                    console.log('inter');
                    setPageNumber((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (ref) {
            observer.observe(ref);
        }

        return () => {
            if (ref) {
                observer.unobserve(ref);
                observer.disconnect();
            }
        };
    }, [ref, hasMore, isLoading]);

    return { ref, setRef };
};

export default useInfinitePagination;
