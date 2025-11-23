"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../../lib/supabaseClient";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Download, Edit3, Briefcase, GraduationCap, Award } from "lucide-react";

export default function ResumePage() {
  const [resume, setResume] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("resume").select("*").eq("id", 1).single();
      setResume(data);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <section className="space-y-8 pt-16 md:pt-24">
        <div className="h-12 w-48 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-lg animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((idx) => (
            <div key={idx} className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-900 rounded-2xl animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  if (!resume) {
    return (
      <section className="space-y-8 pt-16 md:pt-24 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">Resume</h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">No resume available yet.</p>
        </div>
      
          <Link href="/resume/edit">
            <Button variant="default" size="lg">
              <Edit3 size={20} />
              Create Resume
            </Button>
          </Link>
        
      </section>
    );
  }

  const resumeData = resume as any;

  return (
    <section className="space-y-12 pt-16 md:pt-24">
      {/* Header */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                My Resume
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-400">Full-stack engineer with expertise across modern web technologies.</p>
          </div>
          <div className="flex gap-3 w-full sm:w-auto">
            <Button variant="default" size="md">
              <Download size={20} />
              Download PDF
            </Button>
            {userEmail && (
              <Link href="/resume/edit" className="w-full sm:w-auto">
                <Button variant="ghost" size="md" className="w-full">
                  <Edit3 size={20} />
                  Edit
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {resumeData.summary && (
        <Card variant="default" className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Summary</h2>
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">{resumeData.summary}</p>
        </Card>
      )}

      {/* Skills */}
      {resumeData.skills && resumeData.skills.length > 0 && (
        <Card variant="gradient" className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeData.skills.map((skill: any, idx: number) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-700/50"
              >
                {skill}
              </span>
            ))}
          </div>
        </Card>
      )}

      {/* Experience */}
      {resumeData.experience && resumeData.experience.length > 0 && (
        <Card variant="default" className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            Experience
          </h2>
          <div className="space-y-6">
            {resumeData.experience.map((job: any, idx: number) => (
              <div key={idx} className="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{job.position}</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-semibold">{job.company}</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap ml-4">{job.duration}</span>
                </div>
                {job.description && <p className="text-slate-700 dark:text-slate-300 mt-3">{job.description}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Education */}
      {resumeData.education && resumeData.education.length > 0 && (
        <Card variant="gradient" className="p-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
            Education
          </h2>
          <div className="space-y-6">
            {resumeData.education.map((edu: any, idx: number) => (
              <div key={idx} className="pb-6 border-b border-slate-200 dark:border-slate-700 last:border-0 last:pb-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-cyan-600 dark:text-cyan-400 font-semibold">{edu.school}</p>
                  </div>
                  <span className="text-sm text-slate-600 dark:text-slate-400 whitespace-nowrap ml-4">{edu.year}</span>
                </div>
                {edu.field && <p className="text-slate-700 dark:text-slate-300 mt-1">{edu.field}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </section>
  );
}
