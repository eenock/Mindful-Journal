# Mindful Journal

Market-ready journaling MVP with Supabase Auth + real CRUD entries, analytics events, and a Next.js App Router UI.

## What’s Included (Step by Step)
1. **Auth (Supabase Auth)**: email/password sign-in + sign-up, protected routes via middleware, and auth callback handling.
2. **CRUD (Journal Entries)**: create, list, delete entries via `/api/entries` backed by Supabase.
3. **Analytics**: basic event logging to `analytics_events` when entries are created.
4. **Tests + Tooling**: Vitest + Testing Library setup with sample component tests.
5. **README**: setup, env, database schema, and local dev instructions.

## Tech Stack
- Next.js App Router
- Supabase (Auth + Postgres)
- Tailwind CSS (v4)
- Vitest + Testing Library
- Vercel Analytics

## Setup
1. Install dependencies:
   - `npm install`
2. Create `.env.local`:
   - See `.env.example` below
3. Apply SQL schema in Supabase (see **Database Schema**).
4. Run locally:
   - `npm run dev`

## Environment Variables
Create `.env.local` with:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
# Optional fallback if your project uses anon instead of publishable:
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Schema (Supabase SQL)
Run this in Supabase SQL editor:
```sql
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text,
  content text not null,
  mood text,
  word_count int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  event text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists journal_entries_user_id_idx on public.journal_entries(user_id);
create index if not exists analytics_events_user_id_idx on public.analytics_events(user_id);

-- RLS
alter table public.journal_entries enable row level security;
alter table public.analytics_events enable row level security;

create policy "Users can read their own entries"
  on public.journal_entries for select
  using (auth.uid() = user_id);

create policy "Users can insert their own entries"
  on public.journal_entries for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own entries"
  on public.journal_entries for update
  using (auth.uid() = user_id);

create policy "Users can delete their own entries"
  on public.journal_entries for delete
  using (auth.uid() = user_id);

create policy "Users can insert analytics events"
  on public.analytics_events for insert
  with check (auth.uid() = user_id);
```

## Auth Flow
- Users sign in or sign up via `/login`.
- Middleware refreshes the session and protects private routes.
- Auth callback route handles email confirmations and redirects.

## API Endpoints
- `GET /api/entries` → list entries
- `POST /api/entries` → create entry
- `PUT /api/entries/:id` → update entry
- `DELETE /api/entries/:id` → delete entry

## Tests
Run:
```bash
npm test
```

## Lint & Build
```bash
npm run lint
npm run build
```

## Next Steps (Planned)
- AI integration for insights and suggestions
- Payments + subscription management
- Advanced analytics dashboards
