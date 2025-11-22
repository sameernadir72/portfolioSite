"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Resume } from "../lib/types";
import { Input, Textarea } from "./ui/Input";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { Save, AlertCircle, Check } from "lucide-react";

export default function ResumeEditor({ initial, onSaved }: { initial?: Partial<Resume>; onSaved?: () => void }) {
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [skillsRaw, setSkillsRaw] = useState((initial?.skills ?? []).join(", "));
  const [experienceJson, setExperienceJson] = useState(JSON.stringify(initial?.experience ?? [], null, 2));
  const [educationJson, setEducationJson] = useState(JSON.stringify(initial?.education ?? [], null, 2));
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    setLoading(true);
    setStatus("");
    try {
      const payload = {
        id: 1,
        summary,
        skills: skillsRaw.split(",").map((s) => s.trim()).filter(Boolean),
        experience: JSON.parse(experienceJson),
        education: JSON.parse(educationJson),
      };

      await supabase.from("resume").upsert(payload);
      setStatus("success");
      setTimeout(() => onSaved?.(), 1500);
    } catch (err) {
      console.error(err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {status === "success" && (
        <Card variant="default" className="p-4 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-semibold text-green-900 dark:text-green-300">Resume saved!</p>
            <p className="text-sm text-green-800 dark:text-green-400">Your changes have been saved successfully.</p>
          </div>
        </Card>
      )}

      {status === "error" && (
        <Card variant="default" className="p-4 border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <div>
            <p className="font-semibold text-red-900 dark:text-red-300">Failed to save</p>
            <p className="text-sm text-red-800 dark:text-red-400">Please check your input and try again.</p>
          </div>
        </Card>
      )}

      <Card variant="default" className="p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Professional Summary</label>
            <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} placeholder="Write a brief summary of your professional background..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Skills (comma separated)</label>
            <Input value={skillsRaw} onChange={(e) => setSkillsRaw(e.target.value)} placeholder="React, Next.js, TypeScript, Node.js..." />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Experience (JSON format)</label>
            <Textarea value={experienceJson} onChange={(e) => setExperienceJson(e.target.value)} rows={8} placeholder='[{"company": "Company", "position": "Role", "duration": "2020-2024", "description": "..."}]' />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Education (JSON format)</label>
            <Textarea value={educationJson} onChange={(e) => setEducationJson(e.target.value)} rows={6} placeholder='[{"school": "University", "degree": "B.S.", "field": "Computer Science", "year": "2020"}]' />
          </div>

          <Button onClick={handleSave} disabled={loading} variant="default" size="lg" className="w-full">
            <Save size={20} />
            {loading ? "Saving..." : "Save Resume"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
