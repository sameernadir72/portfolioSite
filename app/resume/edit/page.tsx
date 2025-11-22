"use client";
import { useEffect, useState } from "react";
import ResumeEditor from "../../../components/ResumeEditor";
import { supabase } from "../../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function ResumeEditPage() {
  const [resume, setResume] = useState<any | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from('resume').select('*').eq('id', 1).single();
      setResume(data ?? { id:1, summary:'', skills: [], experience: [], education: [] });
    })();
  }, []);

  if (!resume) return <div>Loading...</div>;

  return (
    <section>
      <h1 className="text-2xl font-semibold">Edit Resume</h1>
      <div className="mt-4">
        <ResumeEditor initial={resume} onSaved={() => router.push('/resume')} />
      </div>
    </section>
  );
}
