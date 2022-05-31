export function Publication({ readme }) {
    return (
        <div className="publication">
            <div className="title">{readme.publication_title}</div>
            <div>{readme.contributors}</div>
            <div>{readme.citation}</div>
            <div>{readme.publication_doi}</div>
        </div>
    );
}
            

