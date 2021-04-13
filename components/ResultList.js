export default function ResultList({ results }) {
  return (
    <div>
      <h2 className="title">Results</h2>
      {!results.length && <h3 className="title">No results yet...</h3>}
      <ul className="list-flex">
        {results.map((result, i) => (
          <li key={i}>
            <h3 className="title">{result.query}</h3>
            <div className="img-wrapper">
              <img src={result.filePath} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
