const filter = (data:any) => {
    let titles:string[] = data?.docs?.map((item:{title: string}) => item.title);

    //only getting the unique titles
    titles = [...(new Set(titles))];
    return titles || [];
}

export default filter;