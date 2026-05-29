import { useState } from 'react'

function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim() === '') return
    onSearch(query)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder='Try: "I want a phone under $500" or "best laptop for students"'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Searching...' : 'Get Recommendations'}
      </button>
    </form>
  )
}

export default SearchBar
