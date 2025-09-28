// File: /api/uid-redirect.js
export default async function handler(req, res) {
  const { query } = req;
  const uid = query.u;

  if (!uid) {
    return res.status(400).send('Missing UID');
  }

  // Optional: import Supabase via service role for full access
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  const response = await fetch(`${SUPABASE_URL}/rest/v1/uids?uid=eq.${uid}`, {
    headers: {
      apikey: SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    },
  });

  const data = await response.json();

  // No record found
  if (!data || data.length === 0) {
    return res.redirect(302, `/claim?u=${uid}`);
  }

  const { affiliate_url } = data[0];

  // If linked, go to affiliate
  if (affiliate_url) {
    return res.redirect(302, affiliate_url);
  }

  // Not yet claimed
  return res.redirect(302, `/claim?u=${uid}`);
}
