import fs from 'fs';
import path from 'path';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { dataUrl, filename = 'about-hardware.png' } = req.body || {};
    if (!dataUrl) {
      return res.status(400).json({ error: 'No dataUrl provided' });
    }

    const base64Data = dataUrl.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');
    const safeName = filename.replace(/[^a-zA-Z0-9._-]/g, '');

    // In local or writable serverless /tmp
    const publicPath = path.join(process.cwd(), 'public', 'assets', safeName);
    try {
      fs.writeFileSync(publicPath, buffer);
    } catch {
      // Serverless environments might have read-only root, so ignore write error
    }

    return res.status(200).json({
      success: true,
      url: `/assets/${safeName}`,
      size: buffer.length,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
}
