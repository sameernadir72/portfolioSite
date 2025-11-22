import Link from "next/link";
import { Project } from "../lib/types";
import Card from "./ui/Card";
import Button from "./ui/Button";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card>
      {project.image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={project.image_url} alt={project.title} className="w-full h-44 object-cover" />
      ) : (
        <div className="w-full h-44 bg-slate-100 flex items-center justify-center">No image</div>
      )}
      <div className="p-4">
        <h3 className="font-semibold text-lg">{project.title}</h3>
        <p className="text-sm text-slate-600 mt-2 line-clamp-3">{project.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-xs text-slate-500">{project.tech_stack?.join(' • ')}</div>
          <Link href={`/projects/${project.id}`}>
            <Button variant="ghost">View</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
