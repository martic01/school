import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight, FaMapMarkerAlt, FaCode, FaClock, FaUser, FaStar, FaPause, FaPlay } from "react-icons/fa";
import { alumniDatas } from "../data/Data";
// Alumni data array - easily add/remove alumni here

const alumniData = [...alumniDatas]

const AlumniCarousel = ({render = true}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHoveringArrow, setIsHoveringArrow] = useState(false);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const autoPlayRef = useRef(null);

  // Handle responsive slides per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSlidesPerView(3); // Desktop: 3 per row
      } else if (window.innerWidth >= 768) {
        setSlidesPerView(2); // Tablet: 2 per row
      } else {
        setSlidesPerView(1); // Mobile: 1 per row
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate max index based on slides per view
  const maxIndex = Math.max(0, alumniData.length - slidesPerView);

  const handleNext = useCallback(() => {
    if (currentIndex >= maxIndex) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  }, [currentIndex, maxIndex]);

  const handlePrev = useCallback(() => {
    if (currentIndex <= 0) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  }, [currentIndex, maxIndex]);

  const goToSlide = useCallback((index) => {
    setCurrentIndex(Math.min(index, maxIndex));
  }, [maxIndex]);

  // Auto slide with hover pause
  useEffect(() => {
    if (!isAutoPlaying || isHoveringArrow) return;

    const playNext = () => {
      handleNext();
    };

    autoPlayRef.current = setInterval(playNext, 4000);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isHoveringArrow, handleNext]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Calculate visible slides
  const visibleSlides = alumniData.slice(currentIndex, currentIndex + slidesPerView);

  // Animation variants for Framer Motion
  const cardVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const arrowVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.08,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <section className={`${render ? "block" : "hidden"} w-full py-8 md:py-12 bg-black overflow-x-hidden`}>
      {/* Header with animation effects */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center mb-8 md:mb-12">
        <div className="inline-block mb-3">
          <motion.span 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs md:text-sm font-semibold px-3 py-1.5 bg-red-600 text-white rounded-full"
          >
            SUCCESS STORIES
          </motion.span>
        </div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3"
        >
          <span className="text-white">Meet Our</span>{" "}
          <span className="cent relative inline-block">
            <span className="text-red-600">Exceptional</span>
            <motion.span 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute -bottom-1 left-0 h-0.5 bg-red-600 rounded-full"
            />
          </span>{" "}
          <span className="text-white">Alumni</span>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto"
        >
          Join thousands of graduates who transformed their careers with our comprehensive programs
        </motion.p>
      </div>

      {/* Carousel Container */}
      <div className="max-w-6xl mx-auto px-2 md:px-4 relative">
        {/* Auto-play control */}
        <motion.div 
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute -top-10 right-2 md:right-4 z-20"
        >
          <motion.button
            onClick={toggleAutoPlay}
            onMouseEnter={() => setIsHoveringArrow(true)}
            onMouseLeave={() => setIsHoveringArrow(false)}
            variants={arrowVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            className="w-8 h-8 bg-black rounded-full shadow-lg flex items-center justify-center text-red-600 border border-gray-800 text-xs"
            aria-label={isAutoPlaying ? "Pause auto-play" : "Play auto-play"}
          >
            {isAutoPlaying ? <FaPause className="w-3 h-3" /> : <FaPlay className="w-3 h-3" />}
          </motion.button>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.button
          onClick={handlePrev}
          onMouseEnter={() => setIsHoveringArrow(true)}
          onMouseLeave={() => setIsHoveringArrow(false)}
          disabled={currentIndex === 0}
          variants={arrowVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className={`absolute -left-2 md:-left-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 bg-black rounded-full shadow-lg flex items-center justify-center border text-sm ${
            currentIndex === 0 
              ? 'text-gray-700 border-gray-800 cursor-not-allowed opacity-50' 
              : 'text-red-600 border-gray-800'
          }`}
          aria-label="Previous alumni"
        >
          <FaArrowLeft className="w-3.5 h-3.5" />
        </motion.button>
        
        <motion.button
          onClick={handleNext}
          onMouseEnter={() => setIsHoveringArrow(true)}
          onMouseLeave={() => setIsHoveringArrow(false)}
          disabled={currentIndex >= maxIndex}
          variants={arrowVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          className={`absolute -right-2 md:-right-8 top-1/2 -translate-y-1/2 z-10 w-8 h-8 md:w-9 md:h-9 bg-black rounded-full shadow-lg flex items-center justify-center border text-sm ${
            currentIndex >= maxIndex
              ? 'text-gray-700 border-gray-800 cursor-not-allowed opacity-50' 
              : 'text-red-600 border-gray-800'
          }`}
          aria-label="Next alumni"
        >
          <FaArrowRight className="w-3.5 h-3.5" />
        </motion.button>

        {/* Carousel Content */}
        <div className="relative overflow-hidden">
          <div className="h-[480px] md:h-[520px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              >
                {visibleSlides.map((alumni) => (
                  <motion.div
                    key={alumni.id}
                    variants={cardVariants}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="bg-black rounded-lg shadow-xl overflow-hidden border border-gray-900 h-full flex flex-col mx-1 hover:border-red-600/30 transition-colors duration-300"
                  >
                    {/* Passport-style Image Section */}
                    <div className="relative h-52 md:h-56 overflow-hidden bg-black">
                      <motion.img
                        src={alumni.image || alumni.backimage}
                        alt={alumni.name}
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: 'center 10%' }}
                        whileHover={{ scale: 1.03 }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
                      
                      {/* Company Badge */}
                      <motion.div 
                        className="absolute top-2 right-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                          {alumni.company}
                        </span>
                      </motion.div>
                      
                      {/* Rating Stars */}
                      <div className="absolute bottom-14 left-2 flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                          >
                            <FaStar className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Name Overlay */}
                      <div className="absolute bottom-2 left-2">
                        <h3 className="text-base md:text-lg font-bold text-white">{alumni.name}</h3>
                        <div className="flex items-center gap-1 mt-0.5">
                          <FaUser className="w-2.5 h-2.5 text-red-500" />
                          <span className="text-red-400 text-xs font-medium">{alumni.skill}</span>
                        </div>
                      </div>
                    </div>

                    {/* Alumni Info Section */}
                    <div className="p-3 md:p-4 grow flex flex-col">
                      {/* Quote */}
                      <div className="mb-3 grow">
                        <div className="flex items-start">
                          <div className="text-red-600 text-lg mr-1">"</div>
                          <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-gray-300 italic text-xs md:text-sm leading-relaxed line-clamp-3"
                          >
                            {alumni.quote}
                          </motion.p>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="space-y-2 border-t border-gray-900 pt-2">
                        {/* Location Row */}
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <div className="w-7 h-7 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                            <FaMapMarkerAlt className="w-3.5 h-3.5 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-400 truncate">Location</p>
                            <p className="font-bold text-white text-xs md:text-sm truncate">{alumni.location}</p>
                          </div>
                        </motion.div>

                        {/* Skill Row */}
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.03 }}
                        >
                          <div className="w-7 h-7 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                            <FaCode className="w-3.5 h-3.5 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-400 truncate">Specialization</p>
                            <p className="font-bold text-white text-xs md:text-sm truncate">{alumni.skill}</p>
                          </div>
                        </motion.div>

                        {/* Graduation Year */}
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ x: 2 }}
                          transition={{ type: "spring", stiffness: 300, delay: 0.06 }}
                        >
                          <div className="w-7 h-7 rounded-full bg-red-600/20 flex items-center justify-center shrink-0">
                            <FaClock className="w-3.5 h-3.5 text-red-500" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium text-gray-400 truncate">Graduated</p>
                            <p className="font-bold text-white text-xs md:text-sm">{alumni.graduationYear}</p>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-1 mt-4 md:mt-6">
          {Array.from({ length: Math.ceil(alumniData.length / slidesPerView) }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index * slidesPerView)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`rounded-full ${
                index === Math.floor(currentIndex / slidesPerView)
                  ? "bg-red-600"
                  : "bg-gray-800"
              }`}
              style={{ 
                width: index === Math.floor(currentIndex / slidesPerView) ? "1.25rem" : "0.4rem",
                height: "0.4rem"
              }}
              aria-label={`Go to page ${index + 1}`}
              transition={{ duration: 0.2 }}
            />
          ))}
        </div>

        {/* Stats Section - Black/Red/White Theme */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 md:mt-8 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 max-w-2xl mx-auto"
        >
          {[
            { value: "5000+", label: "Alumni" },
            { value: "94%", label: "Job Rate" },
            { value: "$85K", label: "Avg Salary" },
            { value: "4.9/5", label: "Satisfaction" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -2, transition: { duration: 0.15 } }}
              className="bg-black p-2 md:p-3 rounded-lg border border-gray-900 hover:border-red-600/30 transition-colors duration-300 text-center"
            >
              <div className="text-lg md:text-xl font-black text-red-600 mb-0.5">{stat.value}</div>
              <div className="text-xs font-semibold text-gray-300">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AlumniCarousel;