"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import ResumeEditor from "../../../components/ResumeEditor";
import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function ResumeEditPage() {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("resume").select("*").eq("id", 1).single();
      setResume(data ?? { id: 1, summary: "", skills: [], experience: [], education: [] });
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8 pt-16 md:pt-24">
        <div className="h-12 w-32 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-lg animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((idx) => (
            <div key={idx} className="h-40 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-8 pt-16 md:pt-24">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/resume">
            <Button variant="ghost" size="md" className="group mb-4">
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              Back to Resume
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
              Edit Resume
            </span>
          </h1>
        </div>
      </div>

      <Card variant="glass" className="p-1 border-cyan-200/50 dark:border-cyan-800/50">
        <div className="bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-900/10 dark:to-purple-900/10 p-6 rounded-2xl">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Tip:</span> Use JSON format for experience and education. Provide clear, structured data for best results.
          </p>
        </div>
      </Card>

      {resume && <ResumeEditor initial={resume} onSaved={() => router.push("/resume")} />}
    </section>
  );
}
