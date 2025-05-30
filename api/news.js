const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const { q = 'technology' } = req.query; // Default query if none provided
  const apiKey = process.env.NEWS_API;

  const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'error') {
      return res.status(400).json({ error: data.message });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
