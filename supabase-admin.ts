import 'server-only';
import { createClient } from '@supabase/supabase-js';

// Secret-key client for reads and writes that RLS no longer allows from the public key
// (answers, reward claims, questions, disputes and groups; see lib/sql/).
// It bypasses RLS, so only server actions may import it.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
const secretKey = process.env.SUPABASE_SECRET_KEY || '';

const isBuildPhase =
  process.env.NEXT_PHASE === 'phase-production-build' ||
  process.env.BUILDING === 'true';

if (!isBuildPhase && (!url || !secretKey)) {
  throw new Error(
    'Missing SUPABASE_URL and/or SUPABASE_SECRET_KEY. See .env.example.'
  );
}

export const supabaseAdmin = createClient(
  url || 'https://placeholder.supabase.co',
  secretKey || 'placeholder-secret-key',
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);
