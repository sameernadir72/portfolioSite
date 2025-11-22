"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Project } from "../lib/types";
import { Input, Textarea } from "./ui/Input";
import Button from "./ui/Button";

export default function ProjectForm({
  initial,
  onSaved,
}: {
  initial?: Partial<Project>;
  onSaved?: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [tech, setTech] = useState((initial?.tech_stack ?? []).join(", "));
  const [github, setGithub] = useState(initial?.github_url ?? "");
  const [live, setLive] = useState(initial?.live_url ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async (file: File) => {
    const id = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("projects")
      .upload(id, file, { upsert: false });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("projects").getPublicUrl(id);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let image_url = initial?.image_url ?? null;
      if (image) {
        image_url = await uploadImage(image);
      }

      const payload = {
        title,
        description,
        tech_stack: tech.split(",").map((t) => t.trim()).filter(Boolean),
        github_url: github || null,
        live_url: live || null,
        image_url,
      };

      if (initial?.id) {
        await supabase.from("projects").update(payload).eq("id", initial.id);
      } else {
        await supabase.from("projects").insert(payload);
      }

      onSaved?.();
    } catch (err) {
      console.error(err);
      alert("Error saving project. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm">Title</label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="block text-sm">Description</label>
        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} />
      </div>
      <div>
        <label className="block text-sm">Tech (comma separated)</label>
        <Input value={tech} onChange={(e) => setTech(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm">GitHub URL</label>
          <Input value={github} onChange={(e) => setGithub(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm">Live URL</label>
          <Input value={live} onChange={(e) => setLive(e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm">Image</label>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
      </div>
      <div>
        <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Project"}</Button>
      </div>
    </form>
  );
}
