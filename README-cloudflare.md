# Cloudflare Pages deployment

This project is compatible with Cloudflare Pages as a static front-end app backed by environment variables.

## Required environment variables in Cloudflare Pages

Set these in the Cloudflare dashboard:

- `SUPABASE_PROJECT_URL`
- `SUPABASE_PUBLISHABLE_KEY`

These are read at runtime by the Pages Functions entry in `functions/[[path]].js` and are injected into the HTML before it is served.

## How to deploy

1. Push the repository to GitHub.
2. In Cloudflare Pages, create a new project and connect this repo.
3. Set the project build command to:
   - `npm install`
4. Set the output directory to:
   - `public`
5. Keep the Pages project configured to use the default static build.
6. Add the environment variables above in the Pages project settings.

## Notes

- The app still uses browser-side localStorage login, so no server auth is required.
- The Supabase key is a publishable/anonymous client key, which is safe for static hosting.
- If you need a custom route like `/home`, the Cloudflare function rewrites it to the corresponding HTML page.
