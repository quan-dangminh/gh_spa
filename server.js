const express = require('express');
const fs = require('fs');
const path = require('path');
const { port } = require('./src/config/env');
const { injectEnvVars } = require('./src/middleware/inject-env');

const app = express();

const servePage = (fileName) => (req, res) => {
  const filePath = path.join(__dirname, 'public', 'pages', fileName);
  let html = fs.readFileSync(filePath, 'utf8');
  html = injectEnvVars(html);
  res.send(html);
};

app.get('/', servePage('login.html'));
app.get('/login', servePage('login.html'));
app.get('/home', servePage('home.html'));
app.get('/employee', servePage('employees.html'));
app.get('/employees', servePage('employees.html'));
app.get('/customers', servePage('customers.html'));
app.get('/items', servePage('items.html'));
app.get('/invoices', servePage('invoices.html'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`Supabase URL: ${process.env.SUPABASE_PROJECT_URL || ''}`);
});
