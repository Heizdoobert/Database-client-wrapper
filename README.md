# lib/sdk

The only place that imports a third-party service SDK. The rest of the app imports from here, so
swapping or mocking a vendor touches one file.

| File | SDK | Used by |
|---|---|---|
| `supabase.ts` | `@supabase/supabase-js`, public key (RLS applies) | `lib/db` only |
| `supabase-admin.ts` | same, secret key (bypasses RLS) | `lib/db` only |
| `gemini.ts` | `@google/genai` | server actions and services |
| `sentry.ts` | `@sentry/nextjs` | error boundaries |
| `posthog.ts` | `posthog-js` | `components/providers/PostHogProvider.tsx` |

## Add an SDK

1. `npm install <package>`.
2. Create `lib/sdk/<name>.ts`. Read its keys from `process.env` here, and export the smallest surface the app needs, not the whole package.
3. Add the package to the first `group` in `eslint.config.mjs` (the `no-restricted-imports` block) so nothing outside `lib/sdk` imports it.
4. Add a row to the table above.
5. In tests, mock `@/lib/sdk/<name>` or the package itself.

Root `sentry.*.config.ts` files and `next.config.mjs` stay where Next.js looks for them and may import `@sentry/nextjs` directly.
