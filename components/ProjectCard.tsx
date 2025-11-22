import Link from "next/link";
import { Project } from "../lib/types";
import Card from "./ui/Card";
import Button from "./ui/Button";
import { ExternalLink, ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card 
        variant="glass" 
        hover={true}
        className="h-full group cursor-pointer relative overflow-hidden"
      >
        {/* Hover Glow Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 blur-2xl" />
        </div>

        <div className="relative z-10">
          {/* Image Container with Overlay */}
          <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800">
            {project.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cyan-100/50 to-purple-100/50 dark:from-cyan-900/20 dark:to-purple-900/20">
                <div className="text-center">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-400">No image</div>
                </div>
              </div>
            )}
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content */}
          <div className="p-5 sm:p-6">
            {/* Title */}
            <h3 className="font-bold text-lg sm:text-xl text-slate-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
              {project.description}
            </p>

            {/* Tech Stack Pills */}
            {project.tech_stack && project.tech_stack.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack.slice(0, 3).map((tech, idx) => (
                  <span 
                    key={idx}
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-cyan-500/20 to-purple-500/20 dark:from-cyan-500/30 dark:to-purple-500/30 text-cyan-700 dark:text-cyan-300 border border-cyan-200/50 dark:border-cyan-700/50"
                  >
                    {tech}
                  </span>
                ))}
                {project.tech_stack.length > 3 && (
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400">
                    +{project.tech_stack.length - 3}
                  </span>
                )}
              </div>
            )}

            {/* Action Button */}
            <div className="mt-5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 dark:text-cyan-400 group-hover:gap-2 transition-all duration-300">
                View Project
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
