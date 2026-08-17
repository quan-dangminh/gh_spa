const { supabaseProjectUrl, supabasePublishableKey } = require('../config/env');

function injectEnvVars(html) {
  const injectedScript = `
    <script>
      window.ENV_SUPABASE_URL = "${supabaseProjectUrl}";
      window.ENV_SUPABASE_KEY = "${supabasePublishableKey}";
    </script>
  `;

  return html.replace('</head>', injectedScript + '</head>');
}

module.exports = { injectEnvVars };
