"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Resume } from "../lib/types";
import { Input, Textarea } from "./ui/Input";
import Button from "./ui/Button";
import { Save } from "lucide-react";

export default function ResumeEditor({ initial, onSaved }: { initial?: Partial<Resume>; onSaved?: () => void }) {
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [skillsRaw, setSkillsRaw] = useState((initial?.skills ?? []).join(", "));
  const [experienceJson, setExperienceJson] = useState(JSON.stringify(initial?.experience ?? [], null, 2));
  const [educationJson, setEducationJson] = useState(JSON.stringify(initial?.education ?? [], null, 2));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = {
        id: 1,
        summary,
        skills: skillsRaw.split(",").map((s) => s.trim()).filter(Boolean),
        experience: JSON.parse(experienceJson),
        education: JSON.parse(educationJson),
      };

      await supabase.from("resume").upsert(payload);
      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Failed to save resume");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm">Summary</label>
        <Textarea value={summary} onChange={(e) => setSummary(e.target.value)} rows={4} />
      </div>
      <div>
        <label className="block text-sm">Skills (comma separated)</label>
        <Input value={skillsRaw} onChange={(e) => setSkillsRaw(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Experience (JSON)</label>
        <Textarea value={experienceJson} onChange={(e) => setExperienceJson(e.target.value)} rows={8} />
      </div>
      <div>
        <label className="block text-sm">Education (JSON)</label>
        <Textarea value={educationJson} onChange={(e) => setEducationJson(e.target.value)} rows={6} />
      </div>
      <div>
        <Button onClick={handleSave} disabled={loading}>
          <Save size={16} />
          {loading ? "Saving..." : "Save Resume"}
        </Button>
      </div>
    </div>
  );
}
