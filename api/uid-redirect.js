// /api/uid-redirect.js

export default async function handler(req, res) {
  const { u: uid } = req.query;

  if (!uid) {
    return res.status(400).send('Missing UID.');
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY // Use SERVICE key for server-side reads
    );

    const { data: uidRow, error } = await supabase
      .from('uids')
      .select('affiliate_url, is_claimed')
      .eq('uid', uid)
      .single();

    if (error || !uidRow) {
      console.warn('UID not found or Supabase error:', error);
      return res.redirect(`/claim?u=${uid}`);
    }

    if (!uidRow.is_claimed || !uidRow.affiliate_url) {
      return res.redirect(`/claim?u=${uid}`);
    }

    return res.redirect(uidRow.affiliate_url);
  } catch (err) {
    console.error('Redirect error:', err);
    return res.redirect(`/claim?u=${uid}`);
  }
}
