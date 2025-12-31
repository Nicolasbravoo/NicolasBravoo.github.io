import { ProjectCard } from './components/ProjectCard';
import { TechBadge } from './components/TechBadge';
import { Code, Database, Server, Github, Linkedin, Mail } from 'lucide-react';

export default function App() {
  const projects = [
    {
      title: "Sistema de Gestión Web",
      description: "Aplicación full-stack para gestión de inventarios con dashboard interactivo y reportes en tiempo real.",
      technologies: ["React", "TypeScript", "Node.js", "PostgreSQL"],
      githubUrl: "#",
      liveUrl: "#",
      image: "https://images.unsplash.com/photo-1643116774075-acc00caa9a7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGV8ZW58MXx8fHwxNzY3MTIzNTU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "App Móvil Responsive",
      description: "Aplicación web progresiva (PWA) con diseño mobile-first y funcionalidad offline.",
      technologies: ["React", "Tailwind CSS", "Service Workers"],
      githubUrl: "#",
      liveUrl: "#",
      image: "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzY3MTQ4NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      title: "E-commerce Platform",
      description: "Plataforma de comercio electrónico con carrito de compras, sistema de pagos y panel de administración.",
      technologies: ["Next.js", "MongoDB", "Stripe", "Redux"],
      githubUrl: "#",
      liveUrl: "#",
      image: "https://images.unsplash.com/photo-1727407209320-1fa6ae60ee05?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBzaG9wcGluZ3xlbnwxfHx8fDE3NjcwODU0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const primaryTechs = [
    { name: "React", Icon: Code },
    { name: "TypeScript", Icon: Code },
    { name: "JavaScript", Icon: Code },
    { name: "Tailwind CSS", Icon: Code },
    { name: "Next.js", Icon: Code },
    { name: "HTML/CSS", Icon: Code }
  ];

  const secondaryTechs = [
    { name: "Node.js", Icon: Server },
    { name: "Express", Icon: Server },
    { name: "PostgreSQL", Icon: Database },
    { name: "MongoDB", Icon: Database },
    { name: "MySQL", Icon: Database },
    { name: "Firebase", Icon: Database }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop: 2 columnas, Mobile: 1 columna */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Proyectos - Izquierda en desktop, segundo en mobile */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h1 className="mb-8">Mis Proyectos</h1>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </div>

          {/* Sobre mí - Derecha en desktop, primero en mobile */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4"></div>
              
              <h2 className="text-center mb-4">Tu Nombre</h2>
              <p className="text-center mb-2">Desarrollador Full Stack</p>
              <p className="text-gray-600 text-center mb-6">
                Especializado en Frontend
              </p>
              
              <p className="text-gray-700 mb-6">
                Desarrollador web apasionado por crear experiencias de usuario excepcionales. 
                Con sólida experiencia en desarrollo frontend y conocimientos en tecnologías backend.
              </p>

              <div className="flex justify-center gap-4">
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors">
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Sección de Tecnologías */}
        <div className="mt-16">
          <h2 className="mb-8 text-center">Tecnologías</h2>
          
          {/* Especialización */}
          <div className="mb-8">
            <h3 className="mb-4 text-center">Especialización Frontend</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {primaryTechs.map((tech, index) => (
                <TechBadge key={index} {...tech} category="primary" />
              ))}
            </div>
          </div>

          {/* Tecnologías Secundarias */}
          <div>
            <h3 className="mb-4 text-center">Backend y Bases de Datos</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {secondaryTechs.map((tech, index) => (
                <TechBadge key={index} {...tech} category="secondary" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
