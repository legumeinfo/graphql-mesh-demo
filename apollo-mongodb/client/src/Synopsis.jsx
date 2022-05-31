export function Synopsis({ readme, onReadmeSelected, identifier }) {
    return (
        <div>
            <div className="identifier">
                {readme.identifier}
                {readme.identifier===identifier
                 ?
                 <button value={readme.identifier} onClick={onReadmeSelected}>collapse</button>
                 :
                 <button value={readme.identifier} onClick={onReadmeSelected}>expand</button>
                }
            </div>
            <div className="synopsis">
                {readme.synopsis}
            </div>
        </div>
    );
}
