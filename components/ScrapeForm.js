import { useState } from 'react'
import Loader from './Loader/Loader'

export default function ScrapeForm({ addResult }) {
  const [isLoading, setIsLoading] = useState(false)
  const [query, setQuery] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault()
    if (query) {
      setIsLoading(true)
      const response = await fetch(`/api/scrape?query=${query}`).then((res) =>
        res.json()
      )
      setIsLoading(false)
      addResult(response)
      setQuery('')
    }
  }

  return (
    <div>
      <form className="form" onSubmit={submitHandler}>
        <input
          className="text-input"
          type="text"
          value={query}
          placeholder="Your query"
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button className="btn" type="submit" disabled={isLoading}>
          {isLoading ? <Loader /> : `SEND ${query || 'YOUR QUERY'}`}
        </button>
      </form>
    </div>
  )
}
