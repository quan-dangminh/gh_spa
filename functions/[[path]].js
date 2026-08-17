const routeMap = {
  '/': '/pages/login.html',
  '/login': '/pages/login.html',
  '/home': '/pages/home.html',
  '/employee': '/pages/employees.html',
  '/employees': '/pages/employees.html',
  '/customers': '/pages/customers.html',
  '/items': '/pages/items.html',
  '/invoices': '/pages/invoices.html',
};

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const pathname = url.pathname.replace(/\/+$/, '') || '/';
  const targetPath = routeMap[pathname] || pathname;

  const asset = await env.ASSETS.fetch(new URL(targetPath, request.url));

  if (asset.status === 404) {
    return new Response('Not Found', { status: 404 });
  }

  if (!asset.headers.get('content-type')?.includes('text/html')) {
    return asset;
  }

  let html = await asset.text();
  const injectedScript = `
    <script>
      window.ENV_SUPABASE_URL = ${JSON.stringify(env.SUPABASE_PROJECT_URL || '')};
      window.ENV_SUPABASE_KEY = ${JSON.stringify(env.SUPABASE_PUBLISHABLE_KEY || '')};
    </script>
  `;

  html = html.replace(/<\/head>/i, `${injectedScript}</head>`);

  return new Response(html, {
    status: asset.status,
    headers: {
      ...Object.fromEntries(asset.headers.entries()),
      'content-type': 'text/html; charset=utf-8',
    },
  });
}
