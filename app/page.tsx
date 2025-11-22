import Link from "next/link";
import { supabase } from "../lib/supabaseClient";
import ProjectCard from "../components/ProjectCard";
// import { useEffect, useState } from "react";

export default function HomePage() {
  // const [projects, setProjects] = useState<any[]>([]);

  // useEffect(() => {
  //   (async () => {
  //     const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
  //     if (error) {
  //       console.error(error);
  //       return;
  //     }
  //     setProjects(data ?? []);
  //   })();
  // }, []);

  return (
    <section className="space-y-12">
      <header className="pt-8">
        <h1 className="text-4xl font-extrabold">Hi, I'm Sameer — Full-stack Engineer.</h1>
        <p className="mt-4 text-lg text-slate-600">I build delightful, accessible web apps using React, Next.js and Supabase.</p>
        <div className="mt-6 flex gap-3">
          <Link href="/projects" className="px-4 py-2 bg-primary text-white rounded">View Projects</Link>
          <Link href="/resume" className="px-4 py-2 border rounded">View Resume</Link>
        </div>
      </header>

      <section>
        <h2 className="text-2xl font-semibold">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {/* {projects.slice(0,6).map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))} */}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="mt-2 text-slate-600">Have a project in mind? <Link href="/contact" className="text-primary underline">Get in touch</Link>.</p>
      </section>
    </section>
  );
}

