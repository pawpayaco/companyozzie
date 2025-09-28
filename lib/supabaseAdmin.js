// /lib/supabaseAdmin.js (server only)
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL; // non-public
const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY; // non-public, server ONLY

if (!supabaseUrl || !serviceRole) {
  console.warn('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRole, {
  auth: { persistSession: false },
});
