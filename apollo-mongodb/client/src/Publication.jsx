export function Publication({ readme }) {
    return (
        <div className="publication">
            <div className="title">{readme.publication_title}</div>
            <div className="contributors">{readme.contributors}</div>
            <div className="citation">{readme.citation}</div>
            <div className="doi">{readme.publication_doi}</div>
        </div>
    );
}
            

