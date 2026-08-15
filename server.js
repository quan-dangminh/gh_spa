require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const injectEnvVars = (html) => {
  const supabaseUrl = process.env.SUPABASE_PROJECT_URL || '';
  const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || '';
  
  const injectedScript = `
    <script>
      window.ENV_SUPABASE_URL = "${supabaseUrl}";
      window.ENV_SUPABASE_KEY = "${supabaseKey}";
    </script>
  `;
  
  return html.replace('</head>', injectedScript + '</head>');
};

app.get('/', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'input_form.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.get('/employee', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'employee_input_form.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_PROJECT_URL}`);
});
