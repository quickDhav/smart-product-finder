const API_KEY = import.meta.env.VITE_GEMINI_API_KEY

export async function getRecommendations(userQuery, productList) {
  const productInfo = productList
    .map((p) => `ID:${p.id} - ${p.name} (${p.category}) - $${p.price} - ${p.brand} - ${p.description}`)
    .join('\n')

  const prompt = `You are a helpful shopping assistant. Here is our product catalog:

${productInfo}

The customer says: "${userQuery}"

Based on what the customer wants, recommend the most relevant products from the catalog above. 
Return your response in this exact JSON format (no markdown, just raw JSON):
{
  "recommendedIds": [1, 2, 3],
  "message": "Here's why I recommend these products..."
}

Only include product IDs that are in the catalog. Pick the most relevant ones based on the customer's needs (price range, category, brand preference, etc).`

  const models = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-2.5-flash-lite']

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
            generationConfig: {
              temperature: 0.7,
            },
          }),
        }
      )

      if (response.status === 429) {
        continue
      }

      if (!response.ok) {
        throw new Error('API request failed: ' + response.status)
      }

      const data = await response.json()
      const aiText = data.candidates[0].content.parts[0].text

      try {
        const parsed = JSON.parse(aiText)
        return parsed
      } catch (e) {
        const jsonMatch = aiText.match(/\{[\s\S]*\}/)
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0])
        }
        return { recommendedIds: [], message: 'Sorry, I could not process that. Try again!' }
      }
    } catch (err) {
      continue
    }
  }

  throw new Error('All AI models are currently rate limited. Please try again in a minute.')
}
