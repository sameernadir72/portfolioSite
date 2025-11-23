"use client";
import { use, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { Project } from "../lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import { toast } from "sonner";
import { Upload, Loader2, CheckCircle, XCircle, Image as ImageIcon, Link2 } from "lucide-react";
import { Input, Textarea } from "./ui/Input";
export default function ProjectForm({
  initial,
  onSuccess,
}: {
  initial?: Partial<Project>;
  onSuccess?: () => void;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initial?.image_url || null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    // resolver: zodResolver(formSchema),
    defaultValues: {
      title: initial?.title ?? "",
      description: initial?.description ?? "",
      tech_stack: (initial?.tech_stack?.join(", ") ?? ""),
      github_url: initial?.github_url ?? "",
      live_url: initial?.live_url ?? "",
    },
  });

  const techInput = watch("tech_stack") ;

  // Image upload with preview
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("projects")
      .upload(fileName, file, { upsert: false });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage.from("projects").getPublicUrl(fileName);
    return publicUrl;
  };

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      let image_url = initial?.image_url;

      if (imageFile) {
        setUploading(true);
        image_url = await uploadImage(imageFile);
        setUploading(false);
      }

      const payload = {
        ...data,
        tech_stack: [data.tech_stack],
        image_url,
      };

      if (initial?.id) {
        const { error } = await supabase
          .from("projects")
          .update(payload)
          .eq("id", initial.id);
        if (error) throw error;
        toast.success("Project updated successfully!");
      } else {
        const { error } = await supabase.from("projects").insert(payload);
        if (error) throw error;
        toast.success("Project created successfully!");
      }

      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6"
    >
      <Card className="border-0 shadow-2xl bg-white/80 dark:bg-slate-900/90 backdrop-blur-xl">
        <div className="p-8 lg:p-12">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent mb-8">
            {initial?.id ? "Edit Project" : "Add New Project"}
          </h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Image Upload */}
            <div>
              <Label className="text-lg font-semibold mb-4 block">Project Image</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="rounded-xl object-cover w-full h-64 shadow-lg" />
                ) : (
                  <div className="bg-gray-100 dark:bg-slate-800 border-2 border-dashed rounded-xl h-64 flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="space-y-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-cyan-500 file:to-blue-600 file:text-white hover:file:brightness-110 cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground">Recommended: 1200×800px, JPG/PNG/WebP</p>
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <Label htmlFor="title">Project Title</Label>
              <Input {...register("title")} placeholder="My Awesome Portfolio" className="mt-2 text-lg" />
              {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                {...register("description")}
                placeholder="Tell us what this project does..."
                rows={5}
                className="mt-2 resize-none"
              />
              {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
            </div>

            {/* Tech Stack */}
            <div>
              <Label htmlFor="tech_stack">Tech Stack (comma separated)</Label>
              <Input
                {...register("tech_stack")}
                placeholder="Next.js, TypeScript, Tailwind, Supabase, Framer Motion"
                className="mt-2"
              />
              <div className="flex flex-wrap gap-2 mt-3">
                {techInput?.split(",").map(t => t.trim()).filter(Boolean).map((tech) => (
                  <Badge key={tech} variant="secondary" className="px-3 py-1">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* URLs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="github_url">GitHub URL</Label>
                <Input {...register("github_url")} placeholder="https://github.com/sameernadir4/..." className="mt-2" />
              </div>
              <div>
                <Label htmlFor="live_url">Live Demo URL</Label>
                <Input {...register("live_url")} placeholder="https://yourproject.com" className="mt-2" />
              </div>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              disabled={saving || uploading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-7 text-lg shadow-xl"
            >
              {saving || uploading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {uploading ? "Uploading image..." : "Saving project..."}
                </>
              ) : (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  {initial?.id ? "Update Project" : "Create Project"}
                </>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </motion.div>
  );
}