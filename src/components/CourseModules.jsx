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
  FaDatabase,
  FaMobileAlt,
  FaNetworkWired,
  FaShieldAlt,
  FaCloud,
  FaCode
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { coursesData } from "../data/Data";

const CourseModulesHome = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const cardRefs = useRef([]);
  const navigate = useNavigate();

  // Pick icon for each course card
  const getCourseIcon = (course) => {
    const iconMap = {
      "Data Analysis": FaChartLine,
      "Data Science": FaDatabase,
      "Backend Development": FaCode,
      "Frontend Development": FaLaptopCode,
      "Mobile Development": FaMobileAlt,
      "UI/UX Design": FaGraduationCap,
      "Cloud Computing": FaCloud,
      "Cybersecurity": FaShieldAlt,
      "Networking": FaNetworkWired
    };
    return iconMap[course.name] || FaLaptopCode;
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
    <section className="w-full py-10 sm:py-14 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-2">
            <span className="text-black">Course </span>
            <span className="text-red-600">Modules</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto px-2">
            Your structured learning path from beginner to industry-ready professional
          </p>
        </motion.div>

        {/* Courses Grid - 3 per row on all screens */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
          {coursesData.map((course, index) => {
            const CardIcon = getCourseIcon(course);
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3, scale: 1.02 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                className="relative group"
              >
                {/* Card Container */}
                <div
                  ref={(el) => (cardRefs.current[index] = el)}
                  className="bg-white border border-gray-200 h-full flex flex-col transition-all duration-200 group-hover:border-red-600 group-hover:shadow-lg overflow-hidden min-w-0"
                >
                  {/* Icon Section */}
                  <div className="relative h-16 sm:h-20 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/90 to-red-800/90 transform group-hover:scale-110 transition-transform duration-500" />
                    <div className="relative h-full flex items-center justify-center">
                      <div className="relative z-10">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-md transform group-hover:scale-110 transition-transform duration-300">
                          <CardIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-3 sm:p-4 grow flex flex-col">
                    <h3 className="text-xs sm:text-sm font-bold text-black mb-1 sm:mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                      {course.name}
                    </h3>
                    <p className="text-gray-700 text-[10px] sm:text-xs leading-tight mb-3 sm:mb-4 grow line-clamp-2 sm:line-clamp-3">
                      {course.description}
                    </p>
                    <div className="mt-auto pt-2 sm:pt-3 border-t border-gray-100 group-hover:border-red-600/30 transition-colors duration-300">
                      <button
                        onClick={() => handleKnowMoreClick(course)}
                        className="w-full flex items-center justify-between text-red-600 hover:text-red-700 font-medium transition-colors duration-300 cursor-pointer p-1 sm:p-1.5 -m-1 sm:-m-1.5 rounded hover:bg-red-50"
                      >
                        <span className="text-[10px] sm:text-xs font-bold">Details</span>
                        <FaChevronRight className="w-2 h-2 sm:w-3 sm:h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section (optional) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>{coursesData.length}+ Courses Available</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CourseModulesHome;