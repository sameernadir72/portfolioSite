"use client";
import { useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Project } from "../lib/types";
import { Input, Textarea } from "./ui/Input";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { Save, Upload, AlertCircle, Check } from "lucide-react";

export default function ProjectForm({
  initial,
  onSaved,
}: {
  initial?: Partial<Project>;
  onSaved?: () => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [features, setFeatures] = useState(initial?.features ?? "");
  const [tech, setTech] = useState((initial?.tech_stack ?? []).join(", "));
  const [github, setGithub] = useState(initial?.github_url ?? "");
  const [live, setLive] = useState(initial?.live_url ?? "");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const uploadImage = async (file) => {
    const id = `${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage
      .from("projects")
      .upload(id, file, { upsert: false });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from("projects").getPublicUrl(id);
    return urlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");
    try {
      let image_url = initial?.image_url ?? null;
      if (image) {
        image_url = await uploadImage(image);
      }

      const payload = {
        title,
        description,
        features: features || null,
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "success" && (
        <Card variant="default" className="p-4 border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 flex items-center gap-3">
          <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div>
            <p className="font-semibold text-green-900 dark:text-green-300">Project saved!</p>
            <p className="text-sm text-green-800 dark:text-green-400">Your project has been saved successfully.</p>
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
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Project Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Project"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description</label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what this project does..."
              rows={4}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Key Features</label>
            <Textarea
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              placeholder="List key features (one per line)..."
              rows={3}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Tech Stack (comma separated)</label>
            <Input
              value={tech}
              onChange={(e) => setTech(e.target.value)}
              placeholder="React, Next.js, TypeScript, Tailwind..."
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">GitHub URL</label>
              <Input
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="https://github.com/..."
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Live URL</label>
              <Input
                value={live}
                onChange={(e) => setLive(e.target.value)}
                placeholder="https://example.com"
                disabled={loading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Project Image</label>
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-6 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
                className="hidden"
                id="image-input"
                disabled={loading}
              />
              <label htmlFor="image-input" className="cursor-pointer block">
                <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400 dark:text-slate-600" />
                <p className="font-semibold text-slate-900 dark:text-white">Click to upload</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">or drag and drop</p>
                {image && <p className="mt-2 text-sm text-cyan-600 dark:text-cyan-400">{image.name}</p>}
              </label>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            disabled={loading || !title || !description}
            className="w-full"
          >
            <Save size={20} />
            {loading ? "Saving..." : initial?.id ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </Card>
    </form>
  );
}
