"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../../lib/supabaseClient";
import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import { ExternalLink, Github, ArrowLeft, Edit3 } from "lucide-react";

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const { data } = await supabase.auth.getUser();
        setUserEmail(data?.user?.email ?? null);
      } catch (e) {
        // ignore
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const id = Number(params.id);
      const { data } = await supabase.from('projects').select('*').eq('id', id).limit(1).single();
      setProject(data);
      setLoading(false);
    })();
  }, [params.id]);

  if (loading) {
    return (
      <section className="space-y-8 pt-16 md:pt-24">
        <div className="h-12 w-32 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-lg animate-pulse" />
        <div className="h-96 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl animate-pulse" />
      </section>
    );
  }

  if (!project) {
    return (
      <section className="space-y-8 pt-16 md:pt-24 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Project Not Found</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">The project you're looking for doesn't exist or has been removed.</p>
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
    <section className="space-y-12 pt-16 md:pt-24">
      {/* Back Button */}
      <Link href="/projects">
        <Button variant="ghost" size="md" className="group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
              <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                {project.title}
              </span>
            </h1>
            {userEmail && (
              <Link href={`/projects/${project.id}/edit`}>
                <Button variant="secondary" size="md">
                  <Edit3 size={18} />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Featured Image */}
        {project.image_url && (
          <Card variant="glass" className="overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={project.image_url} 
              alt={project.title}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </Card>
        )}
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <Card variant="default" className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Overview</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
              {project.description}
            </p>
          </Card>

          {/* Key Features */}
          {project.features && (
            <Card variant="default" className="p-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h2>
              <ul className="space-y-3">
                {(Array.isArray(project.features) ? project.features : project.features.split('\n')).map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700 dark:text-slate-300">
                    <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 mt-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Tech Stack */}
          <Card variant="gradient" className="p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech_stack?.map((tech: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-700/50"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Card>

          {/* Links */}
          <Card variant="gradient" className="p-6 space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Links</h3>
            {project.live_url && (
              <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                <Button variant="default" size="md" className="w-full justify-start">
                  <ExternalLink size={18} />
                  View Live
                </Button>
              </a>
            )}
            {project.github_url && (
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Button variant="ghost" size="md" className="w-full justify-start">
                  <Github size={18} />
                  View Source
                </Button>
              </a>
            )}
            {!project.live_url && !project.github_url && (
              <p className="text-sm text-slate-500 dark:text-slate-400">No external links available</p>
            )}
          </Card>

          {/* Timeline */}
          <Card variant="gradient" className="p-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Timeline</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {project.created_at ? new Date(project.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'N/A'}
            </p>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <Card variant="glass" className="p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Interested in similar work?
        </h2>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
          Let's collaborate and bring your ideas to life. Reach out to discuss your next project.
        </p>
        <Link href="/contact">
          <Button variant="secondary" size="lg">
            Get in Touch
          </Button>
        </Link>
      </Card>
    </section>
  );
}
