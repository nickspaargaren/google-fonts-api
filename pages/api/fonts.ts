import type { NextApiRequest, NextApiResponse } from 'next';

const url = require('url');
const needle = require('needle');

const { API_KEY } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await needle('get', `https://www.googleapis.com/webfonts/v1/webfonts?${params}`);

    if (apiRes.statusCode === 400) {
      res.status(500).json({ error: 'failed to load data' });
    } else {
      res.status(200).json(apiRes.body);
    }
  } catch (error) {
    res.status(500).json({ error: 'failed to load data' });
  }
}
