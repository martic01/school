// src/pages/ProjectsShowcasePage.jsx
import { motion } from "framer-motion";
import { FaYoutube, FaGlobe } from "react-icons/fa";
import Navbar from "../components/navbar";
import { projectsData } from "../data/Data";
import Footer from "../components/Footer";

const directions = ["left", "right", "up", "down"];

const getVariants = (dir) => {
  switch (dir) {
    case "left":
      return {
        hidden: { opacity: 0, x: -60 },
        visible: { opacity: 1, x: 0 },
      };
    case "right":
      return {
        hidden: { opacity: 0, x: 60 },
        visible: { opacity: 1, x: 0 },
      };
    case "up":
      return {
        hidden: { opacity: 0, y: 60 },
        visible: { opacity: 1, y: 0 },
      };
    case "down":
      return {
        hidden: { opacity: 0, y: -60 },
        visible: { opacity: 1, y: 0 },
      };
    default:
      return {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      };
  }
};

const ProjectsShowcasePage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white min-h-screen text-black">
        <main className="w-[90vw] max-w-6xl mx-auto py-14 md:py-20">
          {/* Heading */}
          <section className="text-center mb-12 md:mb-16">
            <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-500 mb-2">
              Bootcamp Projects
            </p>
            <h1 className="f2 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Featured Participants&apos; Bootcamp Projects
            </h1>
            <p className="text-sm md:text-base text-gray-700 max-w-3xl mx-auto">
              We adopted project-based learning. Here are some applications
              developed by our participants during the programme. Explore more
              details about the ideas, the year they were built, and the reasons
              behind each solution.
            </p>
          </section>

          {/* Grid of detailed project cards */}
          <section className="grid gap-8 md:gap-10 md:grid-cols-2">
            {projectsData.map((project, index) => {
              const dir = directions[index % directions.length];
              const variants = getVariants(dir);

              return (
                <motion.article
                  key={project.id}
                  variants={variants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                  className="flex flex-col bg-white border border-gray-200 shadow-[0_10px_30px_rgba(0,0,0,0.08)] overflow-hidden"
                >
                  {/* Image with cracked glass + icons */}
                  <div className="relative h-48 md:h-56 bg-black overflow-hidden cracked-glass">
                    <img
                      src={project.image}
                      alt={project.projectName}
                      className="w-full h-full object-cover opacity-80"
                    />
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

                  {/* Info */}
                  <div className="p-5 md:p-6 flex flex-col gap-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-gray-600">
                      <span className="font-semibold text-red-600 uppercase tracking-wide">
                        {project.ownerName}
                      </span>
                      <span className="text-gray-500">
                        Year: <span className="font-semibold">{project.year}</span>
                      </span>
                    </div>

                    <h2 className="text-xl md:text-2xl font-bold text-black">
                      {project.projectName}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-500">
                      Reason for building this project:
                      <span className="ml-1 font-medium text-gray-700">
                        {project.reason}
                      </span>
                    </p>

                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      {project.description}
                    </p>

                    {project.techStack && (
                      <div className="mt-2 text-xs md:text-sm text-gray-600">
                        <span className="font-semibold text-black">
                          Tech stack:
                        </span>{" "}
                        {project.techStack.join(" • ")}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ProjectsShowcasePage;