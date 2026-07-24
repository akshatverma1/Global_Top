// Vercel Serverless Function — GET /api/health
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({
    status: 'ok',
    service: 'Global Top Group API',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
}
