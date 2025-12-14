import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaLinkedin, FaTwitter, FaAward, FaLightbulb } from "react-icons/fa";

const AboutCEO = () => {
  const textRef = useRef(null);

  // Text animation effect
  useEffect(() => {
    const textElement = textRef.current;
    if (!textElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          textElement.classList.add('animate-text-reveal');
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(textElement);
    return () => observer.disconnect();
  }, []);

  const ceoData = {
    name: "Dr. Michael Rodriguez",
    title: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=600&fit=crop&crop=face",
    bio: "A visionary leader with over 15 years of experience in technology education and innovation. Dr. Rodriguez founded our bootcamp with a single mission: to bridge the gap between traditional education and real-world tech skills.",
    quote: "Technology should be accessible to everyone. Our bootcamp isn't just about coding—it's about empowering people to build their future.",
    achievements: [
      "Tech Innovator Award 2022",
      "Forbes 30 Under 30",
      "Google Developer Expert"
    ],
    social: {
      linkedin: "https://linkedin.com/in/ceo",
      twitter: "https://twitter.com/ceo"
    },
    stats: [
      { icon: FaAward, label: "Years Experience", value: "15+" },
      { icon: FaLightbulb, label: "Students Mentored", value: "5000+" }
    ]
  };

  return (
    <section className="relative w-full py-16 md:py-17 border-t border-b border-(--third-bc) bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block text-xs md:text-sm font-bold px-4 py-1.5 bg-red-600 text-white uppercase tracking-wider mb-4">
            Leadership
          </span>
          <h2 className="text-3xl w-fit p-8 justify-self-center  md:text-4xl bg-black h-10 items-center justify-center gap-2 flex lg:text-5xl font-black">
            <span className="text-white">About Our </span>
            <p className="text-red-600 cent">CEO</p>
          </h2>
        </motion.div>

        {/* Main Content Container */}
        <div className="relative">
          {/* Background Pattern */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-red-600/5 rounded-full blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-black/5 rounded-full blur-3xl"></div>

          {/* Content Layout */}
          <div className="relative flex flex-col lg:flex-row items-start gap-8 md:gap-12">
            
            {/* Picture Box - Overlapping to the right */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:w-2/5"
            >
              {/* Picture Container */}
              <div className="relative">
                {/* Main Image */}
                <div className="relative w-full max-w-sm mx-auto lg:mx-0 lg:ml-auto">
                  <div className="relative z-20 overflow-hidden">
                    <motion.img
                      src={ceoData.image}
                      alt={ceoData.name}
                      className="w-full h-auto object-cover"
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 border-2 border-red-600 transform translate-x-2 translate-y-2 -z-10"></div>
                    
                    {/* Floating Elements */}
                    <motion.div
                      animate={{ 
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                      }}
                      transition={{ 
                        duration: 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -top-4 -right-4 w-12 h-12 bg-black rounded-full flex items-center justify-center"
                    >
                      <FaAward className="w-5 h-5 text-white" />
                    </motion.div>
                  </div>
                </div>

                {/* Stats Floating Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -bottom-6 -left-4 lg:-left-8 z-20 bg-white p-4 shadow-2xl rounded-lg border border-gray-200 max-w-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    {ceoData.stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-1.5">
                          <stat.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="text-xl font-black text-black">{stat.value}</div>
                        <div className="text-xs font-medium text-gray-600">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Write Up Box - Main Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="lg:w-3/5 relative z-10"
            >
              <div className="bg-white p-6 md:p-8 lg:p-10 border border-gray-200 shadow-xl relative">
                {/* Decorative Corner */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-red-600"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-red-600"></div>

                {/* CEO Info */}
                <div className="mb-6">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="inline-block text-sm font-medium text-red-600 bg-red-50 px-3 py-1 rounded-full mb-3"
                  >
                    {ceoData.title}
                  </motion.span>
                  
                  <motion.h3 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-black text-black mb-4"
                  >
                    {ceoData.name}
                  </motion.h3>
                </div>

                {/* Bio Text with Animation */}
                <div className="mb-8">
                  <motion.p 
                    ref={textRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-gray-700 text-base md:text-lg leading-relaxed mb-6"
                  >
                    {ceoData.bio}
                  </motion.p>

                  {/* Quote */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="relative pl-6 md:pl-8 py-4 border-l-2 border-red-600"
                  >
                    <FaQuoteLeft className="absolute -left-2 top-0 w-8 h-8 text-red-600 bg-white p-1" />
                    <p className="text-lg md:text-xl italic text-gray-800 font-medium">
                      "{ceoData.quote}"
                    </p>
                  </motion.div>
                </div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="mb-8"
                >
                  <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">
                    Recognitions & Awards
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {ceoData.achievements.map((achievement, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.3 + (index * 0.1) }}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full"
                      >
                        {achievement}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center gap-4 pt-4 border-t border-gray-200"
                >
                  <span className="text-sm font-medium text-gray-600">Connect:</span>
                  <div className="flex gap-3">
                    <motion.a
                      href={ceoData.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <FaLinkedin className="w-4 h-4" />
                    </motion.a>
                    <motion.a
                      href={ceoData.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <FaTwitter className="w-4 h-4" />
                    </motion.a>
                  </div>
                </motion.div>
              </div>

              {/* Floating Animation Element */}
              <motion.div
                animate={{
                  x: [0, 10, 0],
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -right-4 -bottom-4 w-8 h-8 bg-red-600 rounded-full opacity-20"
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* CSS for text animation */}
      <style jsx="true">{`
        .animate-text-reveal {
          animation: textReveal 1.2s ease-out;
        }

        @keyframes textReveal {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AboutCEO;