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
  let html = fs.readFileSync(path.join(__dirname, 'home.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.get('/employee', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'employees.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.get('/customers', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'customers.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.get('/items', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'items.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.get('/invoices', (req, res) => {
  let html = fs.readFileSync(path.join(__dirname, 'invoices.html'), 'utf8');
  html = injectEnvVars(html);
  res.send(html);
});

app.use(express.static(__dirname));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_PROJECT_URL}`);
});
