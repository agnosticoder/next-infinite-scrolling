const { useRef, useEffect, useState } = require('react');

const useInfinitePagination = (setPageNumber, hasMore) => {
    // const ref = useRef();
    const [ref, setRef] = useState();

    useEffect(() => {
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
            }
        };
    }, [ref, hasMore]);

    return { ref, setRef };
};

export default useInfinitePagination;
