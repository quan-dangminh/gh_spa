BizFlow (Invoice & Master Data UI)
=================================

A minimal web UI (static pages + small Express server) to manage employees, customers, items and invoices using Supabase as the backend.

Quick overview
--------------
- Server: Express (server.js) serves static HTML pages and injects SUPABASE_PROJECT_URL and SUPABASE_PUBLISHABLE_KEY (from .env) into each page.
- Frontend: simple HTML/JS pages (employees.html, customers.html, items.html, invoices.html, home.html). Each page uses the supabase-js client (CDN) to talk directly to Supabase.

Prerequisites
-------------
- Node.js (v16+ recommended; tested with Node 18/20/26)
- npm
- A Supabase project with the necessary tables (employee, customers, items, invoices)

.env (required)
---------------
Create a .env file in the project root with these two variables:

SUPABASE_PROJECT_URL=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=sb_publishable_xxx

These values are injected into pages by the server for client-side connections. Do NOT use service_role/secret keys in .env for client pages.

Install
-------
From project root:

npm install

Start the service
-----------------
Start production (single-process):

npm start

Start in development with auto-restart (nodemon):

npm run dev

After starting: open http://localhost:3000

Stop the service
----------------
If you started it in the foreground, Ctrl+C will stop it. If you started it in background (or using a process manager):

- Find the PID and kill it (example):
  ps -eo pid,args | grep 'node server.js'
  lsof -i :3000 then kill <PID>

Restart the service
-------------------
- If using nodemon (npm run dev): nodemon restarts automatically on file changes.
- Otherwise, stop the running process (see above) and run npm start again.
- For production, consider a process manager (pm2 or systemd) to manage restarts.

Pages / Routes
--------------
- /                  → home.html (dashboard)
- /employee          → employees.html
- /customers         → customers.html
- /items             → items.html
- /invoices          → invoices.html

Data model expectations
-----------------------
The UI expects these tables (basic recommended columns):

employee
- id (uuid or serial primary key)
- name text
- jobTitle text
- created_at timestamptz default now()

customers
- id
- name text
- phone text
- address text
- email text
- gender text
- dob date
- created_by text
- created_at timestamptz default now()

items
- id
- name text
- item_group text
- item_sub_group text
- price numeric
- number_of_usage integer
- period text
- created_by text
- created_at timestamptz default now()

invoices
- id
- invoice_number text
- customer_name text
- item_name text
- quantity numeric
- price numeric
- discount_amount numeric
- total numeric
- created_by text
- created_at timestamptz default now()
- updated_at timestamptz

Example SQL (run in Supabase SQL Editor):

-- customers example
create table if not exists customers (
  id uuid default gen_random_uuid() primary key,
  name text,
  phone text,
  address text,
  email text,
  gender text,
  dob date,
  created_by text,
  created_at timestamptz default now()
);

Updating features
-----------------
Common tasks and where to change code:

- Add/rename a field in a table:
  1. Update the Supabase table schema (SQL editor or UI).
  2. Update the corresponding HTML page (customers.html, items.html, etc.) to include the input / show the new field.
  3. Update the client-side insert/update calls in the page's <script> to include the new field name in the payloads.

- Add a new page/route:
  1. Create a new HTML file in the project root.
  2. In server.js add an app.get('/yourroute', ...) reading and injecting env values (follow existing pattern).

- Improve UI/UX (modals, validations):
  Edit the relevant HTML and JS. Pages are small single-file UIs and can be refactored to use a shared JS module if desired.

Pagination / List changes (customers)
------------------------------------
- customers.html implements page-sized listing (20 per page) using Supabase .range(start,end) and requests exact count.
- To change page size, edit pageSize variable in customers.html script.

Security notes
--------------
- The frontend uses the Supabase publishable key (safe to expose). Never add a server-side secret/service_role key to client pages.
- For operations that need to be restricted (e.g., admin-only deletes), implement a backend API that uses server-side service_role keys and enforce auth before performing destructive actions.

Troubleshooting
---------------
- If pages show "Supabase is not configured on the server", ensure .env exists and the server has been restarted after editing .env.
- Check server logs (console where you ran npm start) for errors connecting to Supabase.
- If CORS or permission errors occur, check Supabase table row-level security (RLS) and anon key policies.

Development tips
----------------
- Use npm run dev (nodemon) while editing.
- Keep a local copy of .env but do not commit it.
- Consider adding a .env.example file with placeholders.

Contributing / Extending
------------------------
- Small changes can be made directly in the HTML files (they are intentionally simple). For larger changes, consider moving shared functions into a small JS module and serving it from server/static.

Contact / Author
----------------
This project was scaffolded and updated with the help of Copilot CLI tooling.

