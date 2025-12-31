import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

export function ProjectCard({ title, description, technologies, githubUrl, liveUrl, image }: ProjectCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {image && (
        <div className="w-full h-48 bg-gray-200 overflow-hidden">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
      <div className="p-6">
        <h3 className="mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex gap-4">
          {githubUrl && (
            <a href={githubUrl} className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors">
              <Github className="w-5 h-5" />
              <span>Código</span>
            </a>
          )}
          {liveUrl && (
            <a href={liveUrl} className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors">
              <ExternalLink className="w-5 h-5" />
              <span>Ver demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
