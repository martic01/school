// src/components/CourseModulesHome.jsx
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaBook,
  FaChevronRight,
  FaClock,
  FaUsers,
  FaChartLine,
  FaGraduationCap,
  FaLaptopCode,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { coursesData } from "../data/Data";

const CourseModulesHome = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  // Pick icon for each course card
  const getCourseIcon = (course) => {
    if (course.name === "Data Analysis") return FaChartLine;
    // all others use laptop
    return FaLaptopCode;
  };

  // Infinity animation effect for cards
  useEffect(() => {
    const updateCardEffects = () => {
      cardRefs.current.forEach((ref, index) => {
        if (ref && index === hoveredCard) {
          const x = Math.sin(Date.now() / 1000 + index) * 2;
          const y = Math.cos(Date.now() / 1000 + index) * 2;
          ref.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    };

    const interval = setInterval(updateCardEffects, 50);
    return () => clearInterval(interval);
  }, [hoveredCard]);

  const handleKnowMoreClick = (course) => {
    navigate(`/course/${course.id}`);
  };

  return (
    <section className="w-full py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl w-fit p-8 justify-self-center md:text-4xl h-10 items-center justify-center gap-2 flex lg:text-5xl font-black">
            <span className="text-black">Course</span>
            <p className="text-red-600 cent">Modules</p>
          </h2>
          <span className="inline-block text-xs md:text-sm font-bold px-4 py-1.5 text-black/50 uppercase tracking-wider mb-4">
            YOUR COMPLETE JOURNEY FROM ZERO CODING EXPERIENCE TO TECH
            PROFESSIONAL READINESS
          </span>
        </motion.div>

        {/* Courses Grid - 3 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {coursesData.map((course, index) => {
            const CardIcon = getCourseIcon(course);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Card Container */}
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="bg-white border border-gray-200 h-full flex flex-col transition-all duration-300 group-hover:border-red-600 group-hover:shadow-2xl overflow-hidden"
                  style={{
                    clipPath:
                      index % 4 === 0
                        ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
                        : index % 4 === 1
                        ? "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)"
                        : index % 4 === 2
                        ? "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)"
                        : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                  }}
                >
                  {/* Icon Section with Red Effect */}
                  <div className="relative h-24 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-br from-red-600/90 to-red-800/90 transform group-hover:scale-110 transition-transform duration-500" />
                    <motion.div
                      animate={{
                        x: [-100, 300],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-1/2 left-0 w-32 h-32 bg-white/10 rounded-full blur-xl"
                    />
                    <div className="relative h-full flex items-center justify-start pl-6 md:pl-8">
                      <div className="relative z-10">
                        <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                          <CardIcon className="w-7 h-7 text-red-600" />
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-white/30"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-7 grow flex flex-col">
                    <h3 className="text-xl md:text-2xl font-black text-black mb-3 group-hover:text-red-600 transition-colors duration-300">
                      {course.name}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6 grow">
                      {course.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-100 group-hover:border-red-600/30 transition-colors duration-300">
                      <button
                        onClick={() => handleKnowMoreClick(course)}
                        className="w-full flex items-center gap-2 text-red-600 font-medium group-hover:text-red-700 transition-colors duration-300 cursor-pointer hover:bg-red-50 p-2 -m-2 rounded"
                      >
                        <div className="flex items-center gap-1">
                          <span className="w-1 h-1 bg-red-600 rounded-full" />
                          <span className="w-1 h-1 bg-red-600 rounded-full" />
                          <span className="w-1 h-1 bg-red-600 rounded-full" />
                        </div>
                        <span className="text-sm font-bold">Know More</span>
                        <FaChevronRight className="w-3 h-3 ml-auto transform group-hover:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-linear-to-t from-red-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -top-2 -right-2 w-4 h-4 bg-red-600 rounded-full opacity-0 group-hover:opacity-100"
                />
              </motion.div>
            );
          })}
        </div>

        {/* Stats section (unchanged) */}
      </div>
    </section>
  );
};

export default CourseModulesHome;