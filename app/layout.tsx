import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

export const metadata = {
  title: "Sameer Nadir — Full-stack Engineer & Designer",
  description: "Premium portfolio featuring cutting-edge web development projects built with React, Next.js, and modern technologies.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
        {/* Animated background gradients */}
        <div className="fixed inset-0 -z-20 h-full w-full">
          {/* Light mode gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
          
          {/* Floating gradient blobs - light mode */}
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-300/30 to-blue-400/20 dark:from-cyan-500/10 dark:to-blue-500/5 blur-3xl dark:opacity-40" />
          <div className="absolute top-1/3 -left-40 h-80 w-80 rounded-full bg-gradient-to-tr from-purple-300/30 to-pink-300/20 dark:from-purple-600/10 dark:to-pink-600/5 blur-3xl dark:opacity-40" />
          <div className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-gradient-to-tl from-emerald-300/20 to-cyan-300/20 dark:from-emerald-600/5 dark:to-cyan-600/5 blur-3xl dark:opacity-30" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

