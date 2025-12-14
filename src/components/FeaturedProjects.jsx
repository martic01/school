// src/components/FeaturedProjectsPreview.jsx
import { FaYoutube, FaGlobe } from "react-icons/fa";
import { Link } from "react-router-dom"; // if you are using react-router
import { projectsData } from "../data/projectsData";
import Button from "./AppButton";

const FeaturedProjectsPreview = () => {
  const previewProjects = projectsData.slice(0, 4);

  return (
    <section className="bg-white py-16 md:py-10">
      <div className="w-[90vw] max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-2">
            Bootcamp Projects
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-black">
            Featured Participants&apos; Bootcamp Projects
          </h2>
          <p className="text-sm md:text-base text-gray-700 max-w-2xl mx-auto">
            We adopted project-based learning. Here are some applications
            developed by our participants during the programme.
          </p>
        </div>

        {/* Grid of project cards */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-4 auto-rows-[minmax(260px,auto)]">
          {previewProjects.map((project, index) => (
            <article
              key={project.id}
              className={`
                flex flex-col bg-white border border-gray-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)]
                text-black overflow-hidden
                ${index === 0 ? "md:col-span-2 md:row-span-2" : ""}
                ${index === 3 ? "md:col-span-2" : ""}
              `}
            >
              {/* Image area with cracked glass overlay */}
              <div className="relative h-44 sm:h-52 md:h-56 bg-black overflow-hidden cracked-glass">
                <img
                  src={project.image}
                  alt={project.projectName}
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Center icons (video & site) */}
                <div className="absolute inset-0 flex items-center justify-center gap-4">
                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-white/90 text-red-600 shadow-md hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <FaYoutube className="w-5 h-5" />
                    </a>
                  )}
                  {project.siteUrl && (
                    <a
                      href={project.siteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-11 h-11 flex items-center justify-center rounded-full bg-black/90 text-white shadow-md hover:bg-white hover:text-black transition-colors"
                    >
                      <FaGlobe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>

              {/* Text section */}
              <div className="flex flex-col flex-1 p-4 md:p-5 gap-3">
                <div className="text-xs font-semibold text-red-600 uppercase tracking-wide">
                  {project.ownerName}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-black">
                  {project.projectName}
                </h3>
                <p className="text-xs text-gray-500 mb-1">
                  {project.year} • {project.reason}
                </p>
                <p className="text-sm text-gray-700 leading-relaxed line-clamp-none">
                  {project.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* Explore more button */}
        <div className="mt-10 flex justify-center">
          <Link to="/projects">
            <Button className="px-8 py-3 text-sm md:text-base">
              Explore more projects
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsPreview;