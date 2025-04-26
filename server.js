require('dotenv').config();
const express = require('express');
const { FirecrawlApp } = require('firecrawl');

const app = express();
const port = process.env.PORT || 3000;

const firecrawl = new FirecrawlApp({
  apiKey: process.env.FIRECRAWL_API_KEY,
});

app.use(express.json());

app.post('/crawl', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL é obrigatória' });
  }

  try {
    const result = await firecrawl.crawlUrl({
      url,
      includeHtml: false,
      includeScreenshots: false,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao usar o Firecrawl' });
  }
});

app.listen(port, () => {
  console.log(`API do Firecrawl rodando na porta ${port}`);
});
