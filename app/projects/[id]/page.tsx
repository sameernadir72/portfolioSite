import { supabase } from "../../../lib/supabaseClient";
import ProjectCard from "../../../components/ProjectCard";

export default async function ProjectDetail({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  // Using client lib import may work in a server component as well because client lib uses public anon key
  const { data } = await supabase.from('projects').select('*').eq('id', id).limit(1).single();

  if (!data) {
    return <div>Project not found</div>;
  }

  return (
    <section>
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <div className="mt-4">
        <ProjectCard project={data} />
      </div>
      <div className="mt-6">
        <p className="text-slate-600">{data.description}</p>
        <div className="mt-3 text-sm text-slate-500">Tech: {data.tech_stack?.join(', ')}</div>
      </div>
    </section>
  );
}
