"use client";
import ProjectForm from "../../../../components/ProjectForm";
import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function EditProject({ params }: { params: { id: string } }) {
  const { id } = params;
  const [project, setProject] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('projects').select('*').eq('id', Number(id)).single();
      setProject(data ?? null);
    })();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <section>
      <h1 className="text-2xl font-semibold">Edit Project</h1>
      <div className="mt-4">
        <ProjectForm initial={project} onSaved={() => router.push(`/projects/${id}`)} />
      </div>
    </section>
  );
}
