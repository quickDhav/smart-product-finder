import { useState, useEffect } from 'react'
import SearchBar from './SearchBar'
import ProductList from './ProductList'
import products from './products'
import { getRecommendations } from './api'

function App() {
  const [recommendations, setRecommendations] = useState([])
  const [aiMessage, setAiMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? '#1a1a2e' : '#f5f5f5'
  }, [darkMode])

  const handleSearch = async (query) => {
    setLoading(true)
    setError('')
    setHasSearched(true)

    try {
      const result = await getRecommendations(query, products)

      const recommendedProducts = products.filter((product) =>
        result.recommendedIds.includes(product.id)
      )

      setRecommendations(recommendedProducts)
      setAiMessage(result.message)
    } catch (err) {
      console.error('Error getting recommendations:', err)
      setError('Oops! The AI is busy right now. Please wait a few seconds and try again.')
      setRecommendations([])
      setAiMessage('')
    }

    setLoading(false)
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      <header>
        <h1>Product Recommender</h1>
        <p>Tell me what you're looking for and I'll find the best products for you!</p>
      </header>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && <div className="error-msg">{error}</div>}

      {aiMessage && (
        <div className="ai-response">
          <strong>Recommendation:</strong> {aiMessage}
        </div>
      )}

      {hasSearched && !loading && (
        <ProductList products={recommendations} title="Recommended for You" />
      )}

      <hr className="divider" />

      <ProductList products={products} title="All Products" />
    </div>
  )
}

export default App
