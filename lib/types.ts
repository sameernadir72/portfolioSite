export type Project = {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  github_url?: string | null;
  live_url?: string | null;
  image_url?: string | null;
  created_at?: string | null;
  features: string;
};

export type Resume = {
  id: number;
  summary: string;
  skills: string[];
  experience: Array<{ company: string; role: string; start: string; end?: string; details?: string }>;
  education: Array<{ school: string; degree: string; start: string; end?: string; details?: string }>;
  updated_at?: string | null;
};
