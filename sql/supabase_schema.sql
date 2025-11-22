-- Supabase schema for portfolioSite
-- Tables: projects, resume, admins

-- Enable pgcrypto for uuid generation (optional)
-- create extension if not exists pgcrypto;

-- Projects table
create table if not exists public.projects (
  id bigserial primary key,
  title text not null,
  description text not null,
  tech_stack text[] not null default array[]::text[],
  github_url text,
  live_url text,
  image_url text,
  created_at timestamptz default now()
);

-- Resume table (single row with id=1)
create table if not exists public.resume (
  id integer primary key,
  summary text,
  skills text[] default array[]::text[],
  experience jsonb default '[]'::jsonb,
  education jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- Admins table to list allowed admin user_ids from auth
create table if not exists public.admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  added_at timestamptz default now()
);

-- Enable RLS on tables
alter table public.projects enable row level security;
alter table public.resume enable row level security;
alter table public.admins enable row level security;

-- Projects policies
-- Public can SELECT
create policy "public_select_projects" on public.projects for select using (true);

-- Allow inserts only for authenticated users who are admins
create policy "insert_projects_admins" on public.projects for insert with check (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- Allow updates only for admins
create policy "update_projects_admins" on public.projects for update using (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- Allow deletes only for admins
create policy "delete_projects_admins" on public.projects for delete using (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- Resume policies
-- Public can SELECT the resume (read-only)
create policy "public_select_resume" on public.resume for select using (true);

-- Insert: only server-side admin (we expect a single row created by admin)
create policy "insert_resume_admins" on public.resume for insert with check (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- Update: only admins
create policy "update_resume_admins" on public.resume for update using (
  exists (select 1 from public.admins a where a.user_id = auth.uid())
);

-- Admins table policy
-- Only the service role or an existing admin can insert/remove admin rows.
create policy "select_admins_public" on public.admins for select using (false);
create policy "manage_admins_service_role" on public.admins for all using (
  auth.role() = 'service_role'
);

-- Notes:
-- 1) After creating this schema, insert the single resume row with id=1.
-- 2) Add at least one row to public.admins with the admin's auth user id.
-- Example SQL to insert resume and admin:
-- insert into public.resume (id, summary, skills, experience, education) values (1, 'Your summary', array['TypeScript','React'], '[]', '[]');
-- insert into public.admins (user_id) values ('<admin-uuid>');

-- Contacts table (optional) to store incoming messages
create table if not exists public.contacts (
  id bigserial primary key,
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contacts enable row level security;
create policy "insert_contacts_public" on public.contacts for insert with check (true);
create policy "select_contacts_admins" on public.contacts for select using (exists (select 1 from public.admins a where a.user_id = auth.uid()));

