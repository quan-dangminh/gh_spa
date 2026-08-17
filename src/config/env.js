require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  supabaseProjectUrl: process.env.SUPABASE_PROJECT_URL || '',
  supabasePublishableKey: process.env.SUPABASE_PUBLISHABLE_KEY || '',
};
