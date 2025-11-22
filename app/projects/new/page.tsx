"use client";
import Link from "next/link";
import ProjectForm from "../../../components/ProjectForm";
import Button from "../../../components/ui/Button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <section className="space-y-8 pt-16 md:pt-24">
      <div>
        <Link href="/projects">
          <Button variant="ghost" size="md" className="group mb-4">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Button>
        </Link>
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
            Create New Project
          </span>
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">Add a new project to showcase your work</p>
      </div>

      <ProjectForm onSaved={() => router.push("/projects")} />
    </section>
  );
}
