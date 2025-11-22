"use client";
import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { LogIn, Lock, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Error signing in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white">
            Admin Access
          </h1>
          <p className="text-slate-600 dark:text-slate-400">Sign in to manage your portfolio projects and content.</p>
        </div>

        <Card variant="default" className="p-8 sm:p-10">
          <form onSubmit={signIn} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2 mb-2">
                  <Mail size={16} className="text-cyan-600 dark:text-cyan-400" />
                  Email Address
                </div>
              </label>
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
                <div className="flex items-center gap-2 mb-2">
                  <Lock size={16} className="text-cyan-600 dark:text-cyan-400" />
                  Password
                </div>
              </label>
              <Input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              variant="default"
              size="lg"
              disabled={loading || !email || !password}
              className="w-full"
            >
              <LogIn size={20} />
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400">Need help?</span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            Contact the administrator if you don't have login credentials.
          </p>
        </Card>

        <div className="text-center text-xs text-slate-500 dark:text-slate-500">
          <p>This portal is secured and monitored. Use your admin credentials only.</p>
        </div>
      </div>
    </section>
  );
}
