// File: /api/submit-vendor.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    name,
    email,
    storeType,
    website,
    platformUrl,
    fulfillmentSpeed,
    inventoryCap,
    photoUrl,
    collectionName,
    onboardedBy,
  } = req.body;

  // Basic validation
  if (!name || !email || !platformUrl || !collectionName) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  // Supabase client setup (server-side)
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/vendors`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation'
    },
    body: JSON.stringify({
      name,
      email,
      store_type: storeType,
      platform_url: platformUrl,
      website_url: website,
      shipping_time: fulfillmentSpeed,
      capacity: inventoryCap,
      photo_url: photoUrl,
      collection_name: collectionName,
      onboarded_by: onboardedBy || null,
      created_at: new Date().toISOString()
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return res.status(500).json({ error: 'Failed to submit vendor: ' + err });
  }

  const data = await response.json();
  return res.status(200).json({ success: true, vendor: data[0] });
}
