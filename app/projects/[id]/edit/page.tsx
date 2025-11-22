"use client";
import Link from "next/link";
import ProjectForm from "../../../../components/ProjectForm";
import Button from "../../../../components/ui/Button";
import Card from "../../../../components/ui/Card";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function EditProject({ params }: { params: any }) {
  const { id } = params as { id: string };
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("projects").select("*").eq("id", Number(id)).single();
      setProject(data ?? null);
      setLoading(false);
    })();
  }, [id]);

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

  if (!project) {
    return (
      <section className="space-y-8 pt-16 md:pt-24 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Project Not Found</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">The project you're trying to edit doesn't exist.</p>
        </div>
        <Link href="/projects">
          <Button variant="default" size="lg">
            <ArrowLeft size={20} />
            Back to Projects
          </Button>
        </Link>
      </section>
    );
  }

  return (
    <section className="space-y-8 pt-16 md:pt-24">
      <div>
        <Link href={`/projects/${id}`}>
          <Button variant="ghost" size="md" className="group mb-4">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Project
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Edit Project
          </span>
        </h1>
      </div>

      <Card variant="glass" className="p-1 border-cyan-200/50 dark:border-cyan-800/50">
        <div className="bg-gradient-to-r from-cyan-50 to-purple-50 dark:from-cyan-900/10 dark:to-purple-900/10 p-6 rounded-2xl">
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Editing:</span> {project.title}
          </p>
        </div>
      </Card>

      <ProjectForm initial={project} onSaved={() => router.push(`/projects/${id}`)} />
    </section>
  );
}
