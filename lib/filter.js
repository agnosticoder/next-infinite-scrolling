const filter = (data) => {
    data = data?.docs?.map(item => item.title);

    //only getting the unique titles
    data = [...(new Set(data))];
    return data || [];
}

export default filter;