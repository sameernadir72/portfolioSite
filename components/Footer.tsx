export default function Footer() {
  return (
    <footer className="w-full border-t mt-12 bg-white/60">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center text-sm text-slate-600">
        © {new Date().getFullYear()} Sameer Nadir — Built with Next.js, Supabase, and Tailwind.
      </div>
    </footer>
  );
}
