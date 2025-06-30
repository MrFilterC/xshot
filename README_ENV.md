# Environment Setup

To run the website, you need to create a `.env` file in the website directory with your Supabase credentials:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Get these values from your Supabase project dashboard:
   - Go to Settings → API
   - Copy the Project URL and anon public key

4. Restart the development server:
```bash
npm run dev
```

Note: The website will work without Supabase credentials but will show mock data instead of real-time data.