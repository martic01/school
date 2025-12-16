// src/components/UpcomingBootcamps.jsx
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { upcomingBootcampsData } from "../data/Data";
// Easily edit / add / remove upcoming bootcamps here
const upcomingBootcamps = [...upcomingBootcampsData]

const UpcomingBootcamps = () => {
  return (
    <section className="bg-linear-to-b from-[#2b0204] via-[#1a0203] to-black py-16 md:py-20">
      <div className="w-[90vw] max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="uppercase tracking-[0.25em] text-xs md:text-sm text-red-300 mb-2">
           Our Programmes
          </p>
          <h2 className="f2 text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 text-white">
           Our Programmes
          </h2>
          <p className="text-sm md:text-base text-red-100/80 max-w-2xl mx-auto">
            Join the cohort of ACEDU Coding Bootcamp participants. Learn in a
            structured, project‑based environment with mentors guiding you at
            every step.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {upcomingBootcamps.map((bootcamp, index) => (
            <motion.article
              key={bootcamp.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="bg-white/95 text-black shadow-[0_18px_40px_rgba(0,0,0,0.55)] border border-red-900/60 overflow-hidden flex flex-col"
            >
              {/* Top image */}
              <div className="relative w-full h-32 sm:h-36 md:h-40 overflow-hidden">
                <img
                  src={bootcamp.image}
                  alt={bootcamp.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-2 left-3 text-[11px] uppercase tracking-[0.2em] text-red-200">
                  ACEDU Coding Bootcamp
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-6 flex flex-col gap-3 flex-1">
                <h3 className="text-lg sm:text-xl font-extrabold text-black">
                  {bootcamp.name}
                </h3>

                {/* Place */}
                <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                  <FaMapMarkerAlt className="mt-0.5 text-red-600" />
                  <span>{bootcamp.place}</span>
                </div>

                {/* Date & Time */}
                <div className="flex flex-col gap-1 text-xs sm:text-sm text-gray-800">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-red-600" />
                    <span>{bootcamp.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaClock className="text-red-600" />
                    <span>{bootcamp.time}</span>
                  </div>
                </div>

                {/* Duration */}
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-red-700 bg-red-50 px-3 py-1 mt-1 w-fit">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                  <span>Duration: {bootcamp.duration}</span>
                </div>

                {/* Benefit */}
                <p className="text-xs sm:text-sm text-gray-800 leading-relaxed mt-2 flex-1">
                  {bootcamp.benefit}
                </p>

                {/* Call to action text (purely visual) */}
                <div className="mt-3 pt-2 border-t border-red-100 flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-700 font-semibold">
                    Limited spots available
                  </span>
                  <a href={bootcamp.link} target="_blank" rel="noopener noreferrer">
                    <span className="flex items-center gap-1 text-red-600 font-bold text-[11px] sm:text-xs">
                      Apply Now
                      <FaArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingBootcamps;

