import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Sameer Nadir — Portfolio",
  description: "Portfolio and resume built with Next.js + Supabase",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-800">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

