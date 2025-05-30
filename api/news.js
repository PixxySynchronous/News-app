// api/news.js
const fetch = require('node-fetch');

module.exports = async (req, res) => {
  console.log('API Request received with query:', req.query);
  const { country = 'us', category = 'general', page = 1, pageSize = 10 } = req.query;
  const apiKey = process.env.NEWS_API;

  console.log('API key present?', apiKey ? 'Yes' : 'No');

  if (!apiKey) {
    console.error('ERROR: NEWS_API env var is missing!');
    return res.status(500).json({ error: 'NEWS_API environment variable missing' });
  }

  const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
  console.log('Fetching from NewsAPI:', url);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      console.error('NewsAPI returned error:', text);
      return res.status(response.status).json({ error: text });
    }

    const data = await response.json();
    console.log('NewsAPI returned data status:', data.status);

    if (data.status === 'error') {
      return res.status(400).json({ error: data.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Internal error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
