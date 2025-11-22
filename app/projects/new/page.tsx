"use client";
import ProjectForm from "../../../components/ProjectForm";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();

  return (
    <section>
      <h1 className="text-2xl font-semibold">New Project</h1>
      <div className="mt-4">
        <ProjectForm onSaved={() => router.push('/projects')} />
      </div>
    </section>
  );
}
