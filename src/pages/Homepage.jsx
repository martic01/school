// src/pages/Homepage.jsx
import { FaPen } from 'react-icons/fa';
import VSCodePreview from '../components/VsCodePreview';
import AlumniCarousel from '../components/alumni';
import Button from '../components/AppButton';
import FeaturedProjects from '../components/FeaturedProjects';
import AboutCEO from '../components/AboutCEO';
import CourseModulesHome from '../components/CourseModules';
import UpcomingBootcamps from '../components/UpcomingBootcamps';
import ContactSection from '../components/ContactSection';
import ProductsShowcase from '../components/ProductsShowcase';
import bgImg from "../assets/images/bg-vid.mp4";


const Homepage = () => {


  const whyCourse = [
    { text: 'Beginners starting their tech journey.' },
    { text: 'Students building future-proof digital skills' },
    { text: 'Career changers transitioning into tech' },
    { text: 'Entrepreneurs building tech-enabled products' },
    { text: ' Tech professionals looking to upskill or specialize' },
  ];

  return (
    <>
 {/* HERO SECTION WITH VIDEO BACKGROUND */}
      <div className="w-full bg-gray-50" id="hero-section">
        <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] overflow-hidden">
          {/* Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover object-[center_37%]"
          >
            <source src={bgImg} type="video/mp4" />
            {/* Add fallback for browsers that don't support video */}
            <img src="/" alt="Background" />
          </video>

          {/* Dark overlay for better text visibility */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

          {/* Content */}
          <div className="
            relative z-10
            w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[70vh]
            flex flex-col md:flex-row
            md:justify-between sm:justify-center items-center
            md:p-4 py-6 px-3 md:px-6 mt-3
            gap-5 md:gap-8
          ">
            {/* Left content */}
            <div className="w-full md:w-2/3 h-auto md:h-full mb-4 md:mb-0 md:mr-6 rounded-lg p-6 md:p-8 flex flex-col justify-center">
              <h1 className="f1 font-extrabold text-red-600 mb-4 text-3xl sm:text-4xl md:text-5xl">
                ACEDU Coding BootCamp
              </h1>
              <p className="text-white mt-2 text-base sm:text-lg md:text-xl mb-4 md:mb-6">
                Growing Local Talent For The Global Digital Economy
              </p>
            </div>

            {/* Right VS Code editor */}
            <div
              className="
                w-full md:w-1/3
                max-w-md md:max-w-none
                h-auto md:h-full
                flex items-center justify-center
                md:mt-0
              "
            >
              <div className="w-full h-full max-h-[500px] md:max-h-[90%]">
                <VSCodePreview />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* WHY THIS COURSE SECTION */}
      <div
        id="why-course-section"
        className="w-[90vw] max-w-6xl mx-auto mt-16 mb-16 p-4 md:p-6 flex flex-col gap-8 md:gap-10"
      >
        {/* Content container - two columns side by side */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-10">
          {/* Left Column */}
          <div className="w-full md:w-[55%] lg:w-[600px] flex flex-col justify-start gap-4 md:gap-6">
            <p className="text-sm md:text-base ml-2 md:ml-7 font-bold text-(--text3-c)">
              Why choose ACEDU...
            </p>
            <h1 className="f2 font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
              Is ACEDU right for You
              <span className="text-(--text3-c)">?</span>
            </h1>
            <p className="text-base md:text-lg text-gray-700 mt-3">
              At ACEDU Coding BootCamp, we believe effective tech education blends clear structure, hands-on practice, and consistent guidance. Our programs are designed to help learners not only understand concepts, but also apply them confidently through practical projects and mentorship.
            </p>
          </div>

          {/* Right Column - Why Course Items */}
          <div className="w-full md:w-[45%] lg:w-[500px] flex flex-col gap-6 md:gap-10 justify-start">
            {whyCourse.map((item, index) => (
              <div
                key={index}
                className="flex items-start bg-red-50 hover:bg-amber-100 transition-colors"
              >
                <FaPen className="mr-3 mt-1 shrink-0 size-5 md:size-6 text-(--text3-c)" />
                <p className="text-sm md:text-base lg:text-2xl text-red-800/70">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Button centered at bottom */}
        <div className="flex justify-center mt-6 md:mt-8">
          <a href="https://wa.me/+2347048606767" target="_blank" rel="noreferrer">
            <Button icon='chat' className="w-full md:w-auto min-w-[280px] h-12 md:h-14 text-sm md:text-base px-8">
              Chat with a course advisor
            </Button>
          </a>
        </div>
      </div>


      {/* Courses modules */}
      <div className="w-full h-fit" id="courses-section">
        <CourseModulesHome />
      </div>


      <div className="w-full h-fit" id="product-section">
        <ProductsShowcase />
      </div>

      {/* Featured Projects */}
      <div className="w-full h-fit" id="projects-section">
        <FeaturedProjects />
      </div>


      <div className="w-full h-fit" id="alumni-section">
        <AlumniCarousel render={false} />
      </div>


      {/* About CEO / About section */}
      <div className="w-full h-fit" id="about-ceo-section">
        <AboutCEO />
      </div>


      {/* Upcoming Bootcamps */}
      <div className="w-full h-fit" id="bootcamps-section">
        <UpcomingBootcamps />
      </div>

      {/* Contact section */}
      <div className="w-full h-fit" id="contact-section">
        <ContactSection />
      </div>
    </>
  );
};

export default Homepage;