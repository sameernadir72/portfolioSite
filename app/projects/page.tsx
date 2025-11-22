import Link from "next/link";
import ProjectCard from "../../components/ProjectCard";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
      setProjects(data ?? []);
    })();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/projects/new" className="text-sm px-3 py-1 border rounded">New Project</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
