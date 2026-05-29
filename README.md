# Product Recommender

A React app that uses AI (Google Gemini) to recommend products based on what you're looking for.

## How to run

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## How it works

1. The app has a catalog of 16 products (phones, laptops, headphones, tablets, smartwatches)
2. You type what you want — like "I want a phone under $500" or "best laptop for students"
3. The app sends your query to Google Gemini AI along with the product catalog
4. Gemini analyzes your preferences and recommends the best matching products
5. The recommended products are displayed at the top

## Tech Stack

- **React** (with Vite)
- **Google Gemini API** for AI recommendations
- **CSS** for styling

## Project Structure

```
src/
├── main.jsx          - Entry point
├── App.jsx           - Main component
├── SearchBar.jsx     - Search input component
├── ProductCard.jsx   - Product card component
├── ProductList.jsx   - Product grid component
├── products.js       - Product data
├── api.js            - Gemini API integration
└── index.css         - Styles
```

## API Key Setup

Create a `.env` file in the root folder and add your Gemini API key:

```
VITE_GEMINI_API_KEY=your_api_key_here
```

Get a free key from https://aistudio.google.com/app/apikey
