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
import bgImg from "../assets/images/check.jpg";


const Homepage = () => {
  
  const whyCourse = [
    { text: ' Aspiring Font-end Software Developers seeking a comprehensive skill set.' },
    { text: ' Career Changers looking to enter a dynamic and in-demand field.' },
    {
      text:
        ' Freelancers aiming to offer front-end software development services to companies across the world from anywhere.',
    },
    { text: 'Business Owners & Entrepreneurs wanting to build a start-up.' },
    {
      text:
        ' Tech Professionals looking to up skill or specialize in Front-end Engineering.',
    },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <div className="w-full bg-gray-50" id="hero-section">
        <div
          style={{
            backgroundImage: `url(${bgImg})`,
            backgroundSize: 'cover',
            backgroundAttachment: 'fixed',
          }}
          className="w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[70vh]"
        >
          <div
            className="
              w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[70vh] bg-(--dim) cent
              flex flex-col md:flex-row
              md:justify-between  sm:justify-center items-center
              md:p-4 py-6 px-3 md:px-6 mt-3
              gap-5 md:gap-8
            "
          >
            {/* Left content */}
            <div className="w-full md:w-2/3 h-auto md:h-full mb-4 md:mb-0 md:mr-6 rounded-lg p-6 md:p-8 flex flex-col justify-center">
              <h1 className="f1 font-extrabold text-red-600 mb-4 text-3xl sm:text-4xl md:text-5xl">
                Welcome to Acedu.BootCamp
              </h1>
              <p className="text-white mt-2 text-base sm:text-lg md:text-xl mb-4 md:mb-6">
                Transforming tech education with hands-on learning experiences.
                Learn from industry experts and build real-world projects.
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
        className="w-[90vw] max-w-6xl mx-auto mt-16 mb-10 p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-10 md:min-h-[50vh]"
      >
        {/* Left Column */}
        <div className="w-full md:w-[55%] lg:w-[600px] flex flex-col justify-start gap-4 md:gap-6">
          <p className="text-sm md:text-base ml-2 md:ml-7 font-bold text-(--text3-c)">
            Why this Course...
          </p>
          <h1 className="f2 font-bold leading-tight text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
            Is this path right for You
            <span className="text-(--text3-c)">?</span>
          </h1>
          <p className="text-base md:text-lg text-gray-700 mt-3">
            Hundreds join our courses to make a fast impact. Software
            development is a forever in-demand field, and LinkedIn&apos;s 2025
            rankings list it among the top paying jobs. The course equips you
            with the expertise to achieve your goals.
          </p>

          {/* Reusable button here */}
         <a href="https://wa.me/+2347048606767" target="_blank" rel="noreferrer">
           <Button className="w-full md:w-[280px] h-12 md:h-14 mt-4 text-sm md:text-base">
            Chat with a course advisor
          </Button>
         </a>
        </div>

        {/* Right Column - Why Course Items */}
        <div className="w-full md:w-[45%] lg:w-[500px] flex flex-col gap-6 md:gap-10 justify-start">
          {whyCourse.map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-red-50 hover:bg-amber-100 transition-colors"
            >
              <FaPen className="mr-3 mt-1 shrink-0 size-5 md:size-6 text-(--text3-c)" />
              <p className="text-sm md:text-base lg:text-lg text-red-800/70">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni */}
      <div className="w-full h-fit" id="alumni-section">
        <AlumniCarousel />
      </div>

      {/* Featured Projects */}
      <div className="w-full h-fit" id="projects-section">
        <FeaturedProjects />
      </div>

      {/* About CEO / About section */}
      <div className="w-full h-fit" id="about-ceo-section">
        <AboutCEO />
      </div>

      {/* Courses modules */}
      <div className="w-full h-fit" id="courses-section">
        <CourseModulesHome />
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