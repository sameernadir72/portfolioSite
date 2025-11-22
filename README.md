# Portfolio Site (Next.js + Supabase)

This repository is a starter portfolio+resume built with:

- Next.js 16 (App Router)
- React 19
- TypeScript (strict)
- Tailwind CSS v3.4+
- Supabase (Auth + PostgreSQL + Storage)
- @supabase/supabase-js v2
- @react-pdf/renderer

Getting started
1. Create a Supabase project at https://app.supabase.com
2. Create a storage bucket named `projects` (public) for uploaded images.
3. Create the database schema and RLS policies

   - In the SQL editor run `sql/supabase_schema.sql` from this repo. It creates `projects`, `resume`, and `admins` tables and RLS policies.

4. Insert initial rows

   - Add the resume row (id = 1):

     ```sql
     insert into public.resume (id, summary, skills, experience, education)
     values (1, 'Your summary here', array['TypeScript','React'], '[]', '[]');
     ```

   - Add yourself as an admin (replace <user-uuid> with the user's auth id):

     ```sql
     insert into public.admins (user_id) values ('<user-uuid>');
     ```

   To find a user's UUID: create a user via the Supabase Auth UI or Signup, then check `auth.users`.

5. Add environment variables in `.env.local` at project root:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=service-role-key   # server-only, never commit
   RESEND_API_KEY=...   # optional, for contact email sending
   ```

6. Install dependencies and run locally

   ```powershell
   npm install
   npm run dev
   ```

Notes
- RLS policies are configured so that public SELECTs are allowed but INSERT/UPDATE/DELETE on `projects` and `resume` require membership in `public.admins`.
- Admin-only pages in the app rely on the user being logged in with Supabase. The SQL policies prevent unauthorized DB writes even if client-side protection is bypassed.
- Create the `projects` storage bucket and make it public; file uploads use the `projects` bucket.

Deploying to Vercel
- Add the environment variables (except `SUPABASE_SERVICE_ROLE_KEY` if you don't need server-only operations on Vercel; otherwise add it in Vercel's UI as a server-only var).
- Push to a GitHub repo and import to Vercel.

Extras
- The `/resume` page includes a PDF download using `@react-pdf/renderer`.
- Contact form uses Resend (if `RESEND_API_KEY` present) or falls back to storing messages in a `contacts` table using the Supabase admin client.
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
